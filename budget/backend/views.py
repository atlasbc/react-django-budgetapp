from .models import Dummy
from .serializers import DummySerializer
from rest_framework import generics


class DummyListCreate(generics.ListCreateAPIView):
    queryset = Dummy.objects.all()
    serializer_class = DummySerializer
