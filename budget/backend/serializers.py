from rest_framework import serializers
from .models import Income, User, Transaction


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'name', 'amount', 'category', 'created_at')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'total', 'income']
        depth = 1


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'name', 'amount', 'category', 'created_at')
