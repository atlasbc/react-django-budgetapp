from django.urls import path
from . import views

urlpatterns = [
    path("api/dummy/", views.DummyListCreate.as_view(), name="dummy"),
    path("api/income/", views.IncomeListCreate.as_view(), name="income"),
    path("api/user/", views.UserListCreate.as_view(), name="user"),
    path("api/user/<int:pk>/", views.UserDetail.as_view(), name="user_detail"),
]
