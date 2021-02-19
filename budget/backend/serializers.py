from rest_framework import serializers
from .models import Dummy, Income, User, Transaction


class DummySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dummy
        fields = ('id', 'name', 'message')


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'name', 'amount', 'category', 'created_at')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'total', 'income']
        depth = 1
        #fields = ('id', 'username', 'total', 'is_superuser')


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'name', 'amount', 'category', 'created_at')
