from django.urls import path
from . import views

urlpatterns = [
    path("api/dummy/", views.DummyListCreate.as_view(), name="dummy"),
    # Income API
    path("api/income/", views.IncomeListCreate.as_view(), name="income"),
    path("api/income/<int:pk>/delete/",
         views.IncomeDelete.as_view(), name="income_delete"),
    path("api/income/<int:pk>/update/",
         views.IncomeUpdate.as_view(), name="income_update"),
    # User API
    path("api/user/", views.UserListCreate.as_view(), name="user"),
    path("api/user/<int:pk>/", views.UserDetail.as_view(), name="user_detail"),
    # Authentication
    path("login-request", views.login_view),
    path("logout-request", views.logout_view),
    path("auth-check", views.auth_check),
    path("register-request", views.register_view),
]
