from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('about', views.index),
    path('income', views.index),
    path('login', views.index),
]
