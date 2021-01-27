from django.urls import path
from . import views

urlpatterns = [
    path("api/dummy/", views.DummyListCreate.as_view(), name="dummy"),
]
