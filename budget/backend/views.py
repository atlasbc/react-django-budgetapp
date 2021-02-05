from .models import Dummy, Income, Transaction, Budget, User
from .serializers import DummySerializer, IncomeSerializer, UserSerializer
from rest_framework import generics


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
        print(self.request)
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
