from rest_framework import serializers
from .models import Dummy


class DummySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dummy
        fields = ('id', 'name', 'message')
