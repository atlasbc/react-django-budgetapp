from .models import Dummy, Income, Transaction, Budget, User
from .serializers import DummySerializer, IncomeSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse
import json
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

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


class IncomeListCreate(generics.ListCreateAPIView):
    # Need to find return income specific to one user.
    # TODO
    # POST also fails with this
    # queryset = Income.objects.all()
    serializer_class = IncomeSerializer

    # This returns data for logged user
    def get_queryset(self):
        # with this POST doesnt work
        # ERROR: NOT NULL constraint failed: backend_income.user_id
        user = self.request.user
        print(user)
        print(self.request.auth)
        return Income.objects.filter(user=user).order_by('-id')


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
