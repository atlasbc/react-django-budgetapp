from rest_framework import serializers
from .models import Dummy, Income, User


class DummySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dummy
        fields = ('id', 'name', 'message')


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'name', 'amount', 'category')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'total', 'income']
        depth = 1
        #fields = ('id', 'username', 'total', 'is_superuser')
