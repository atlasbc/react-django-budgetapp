from django.urls import path
from . import views

urlpatterns = [
    # Income API
    path("api/income/", views.IncomeListCreate.as_view(), name="income"),
    path("api/income/<int:pk>/delete/",
         views.IncomeDelete.as_view(), name="income_delete"),
    path("api/income/<int:pk>/update/",
         views.IncomeUpdate.as_view(), name="income_update"),
    # Transaction API
    path("api/transactions/", views.TransactionListCreate.as_view(),
         name="transactions"),
    path("api/transactions/<int:pk>/delete/",
         views.TransactionDelete.as_view(), name="transactions_delete"),
    path("api/transactions/<int:pk>/update/",
         views.TransactionUpdate.as_view(), name="transactions_update"),
    path("api/transactions/categories", views.TransactionListCategories.as_view(),
         name="transaction_categories"),
    # User API
    path("api/user/", views.UserListCreate.as_view(), name="user"),
    path("api/user/<int:pk>/", views.UserDetail.as_view(), name="user_detail"),
    # Authentication
    path("login-request", views.login_view),
    path("logout-request", views.logout_view),
    path("auth-check", views.auth_check),
    path("register-request", views.register_view),
    # Home View API
    path("home-request", views.home_view)
]
