from .models import Dummy, Income, Transaction, Budget, User
from .serializers import DummySerializer, IncomeSerializer, UserSerializer, TransactionSerializer
from django.db.models import Sum
import json

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from rest_framework.views import APIView
# from rest_framework import status
from rest_framework.response import Response as RestResponse

#####################################################
########### AUTHENTICATION RELATED VIEWS ############
#####################################################


@require_POST
def login_view(request):
    # Uses CSRF Token

    print(request)
    print(request.body)
    data = json.loads(request.body)
    print(data)
    username = data.get("username")
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({
            "error": "Please enter both username and password"
        }, status=400)

    if request.user.is_authenticated:
        return JsonResponse({
            "error": "You are already logged in!"
        }, status=400)

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        return JsonResponse({"success": "You have logged in! Go to your home page",
                             "user": username})
    else:
        # Return an 'invalid login' error message.
        return JsonResponse({"error": "Invalid login"})


@require_POST
def register_view(request):
    # Uses CSRF Token

    print(request)
    print(request.body)
    data = json.loads(request.body)
    print(data)
    username = data.get("username")
    password = data.get('password')
    confirmation = data.get('confirmation')
    email = data.get('email')

    if username is None or password is None or confirmation is None or email is None:
        return JsonResponse({
            "error": "Please fill all the fields"
        }, status=400)

    if password != confirmation:
        return JsonResponse({
            "error": "Passwords must match",
            "bad-password": True
        }, status=400)

    if request.user.is_authenticated:
        return JsonResponse({
            "error": "You are already logged in!"
        }, status=400)

    try:
        user = User.objects.create_user(
            username=username, email=email, password=password)
    except IntegrityError:
        return JsonResponse({
            "error": "This username is already exist"
        }, status=400)

    login(request, user)
    return JsonResponse({
        "success": "You have successfully registered",
        "user": username
    })


def auth_check(request):
    user = request.user

    if user.is_authenticated:
        return JsonResponse({"user": str(user)})
    else:
        return JsonResponse({"user": ""})


def logout_view(request):
    logout(request)
    return JsonResponse({"user": False})


#####################################################
################ API RELATED VIEWS ##################
#####################################################
class DummyListCreate(generics.ListCreateAPIView):
    queryset = Dummy.objects.all()
    serializer_class = DummySerializer

######### INCOME #########


class IncomeListCreate(generics.ListCreateAPIView):
    serializer_class = IncomeSerializer

    # This returns data for logged user
    def get_queryset(self):
        # with this POST doesnt work
        # ERROR: NOT NULL constraint failed: backend_income.user_id
        user = self.request.user
        print(user)
        print(self.request.auth)
        return user.income.all()

    # This solves the ERROR: NOT NULL constraint failed: backend_income.user_id
    # Because it provides the user_id by selecting user from request
    def perform_create(self, serializer):
        # This request object belongs to rest-framework not Django
        # rest-framework returns request body data via request.data
        # It also handles data being json object
        # BROWSABLE API STILL WORKS with this customization
        print(self.request)
        print(self.request.data)
        data = self.request.data

        name = data.get("name")
        amount = data.get('amount')
        category = data.get('category')

        serializer.save(user=self.request.user, name=name, amount=amount,
                        category=category)


class IncomeDelete(generics.DestroyAPIView):
    # This should check authentication of the user to prevent other user's data.
    serializer_class = IncomeSerializer

    def get_queryset(self):
        # This prevents deleting other people's data
        # Because queryset only returns authenticated user's data
        # If you try to delete other people's income id
        # It returns "detail": "Not found."
        user = self.request.user
        print(user)
        print(self.request.auth)
        return user.income.all()


class IncomeUpdate(generics.UpdateAPIView):
    # This should check authentication of the user to prevent other user's data.
    # returns the updated data if it is successful
    serializer_class = IncomeSerializer

    def get_queryset(self):
        # This prevents deleting other people's data
        # Because queryset only returns authenticated user's data
        # If you try to delete other people's income id
        # It returns "detail": "Not found."
        user = self.request.user
        print(user)
        print(self.request.auth)
        return user.income.all()


######### TRANSACTION #########
class TransactionListCreate(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer

    # This returns data for logged user
    def get_queryset(self):
        # with this POST doesnt work
        # ERROR: NOT NULL constraint failed: backend_income.user_id
        user = self.request.user
        print(user)
        print(self.request.auth)
        return user.transactions.all()

    # This solves the ERROR: NOT NULL constraint failed: backend_income.user_id
    # Because it provides the user_id by selecting user from request
    def perform_create(self, serializer):
        # This request object belongs to rest-framework not Django
        # rest-framework returns request body data via request.data
        # It also handles data being json object
        # BROWSABLE API STILL WORKS with this customization
        print(self.request)
        print(self.request.data)
        data = self.request.data

        name = data.get("name")
        amount = data.get('amount')
        category = data.get('category')
        serializer.save(user=self.request.user, name=name, amount=amount,
                        category=category)


class TransactionListCategories(APIView):

    def get(self, request):
        user = self.request.user
        category_sum = RestResponse(user.transactions.values('category')
                                    .annotate(data_sum=Sum('amount')))
        return category_sum


class TransactionDelete(generics.DestroyAPIView):
    # This should check authentication of the user to prevent other user's data.
    serializer_class = TransactionSerializer

    def get_queryset(self):
        # This prevents deleting other people's data
        # Because queryset only returns authenticated user's data
        # If you try to delete other people's income id
        # It returns "detail": "Not found."
        user = self.request.user
        print(user)
        print(self.request.auth)
        return user.transactions.all()


class TransactionUpdate(generics.UpdateAPIView):
    # This should check authentication of the user to prevent other user's data.
    # returns the updated data if it is successful
    serializer_class = TransactionSerializer

    def get_queryset(self):
        # This prevents deleting other people's data
        # Because queryset only returns authenticated user's data
        # If you try to delete other people's income id
        # It returns "detail": "Not found."
        user = self.request.user
        print(user)
        print(self.request.auth)
        return user.transactions.all()

######### HOME #########


def home_view(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "You are not logged in!"}, status=401)

    income_sum = user.income.aggregate(Sum('amount'))['amount__sum']
    transaction_sum = user.transactions.aggregate(Sum('amount'))['amount__sum']
    total = income_sum - transaction_sum

    return JsonResponse({"total": total})

######### USER #########


class UserListCreate(generics.ListCreateAPIView):
    #queryset = User.objects.all()
    serializer_class = UserSerializer

    # This returns data for logged user
    def get_queryset(self):
        user = self.request.user
        print(user)
        return User.objects.filter(username=user)


class UserDetail(generics.RetrieveAPIView):
    # This only Allows GET, HEAD, OPTIONS
    queryset = User.objects.all()
    serializer_class = UserSerializer
