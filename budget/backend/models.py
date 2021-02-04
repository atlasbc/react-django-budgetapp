from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Dummy(models.Model):
    name = models.CharField(max_length=100)
    message = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)


class User(AbstractUser):
    total = models.DecimalField(max_digits=8, decimal_places=2, default=0)


class Income(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="income")
    # category = models.ForeignKey(
    #     Category, on_delete=models.CASCADE, related_name="income_categories")


class Transaction(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="transactions")
    # category = models.ForeignKey(
    #     Category, on_delete=models.CASCADE, related_name="transation_categories")


class Budget(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="budget")
    # category = models.ForeignKey(
    #     Category, on_delete=models.CASCADE, related_name="budget_categories")


# # Maybe I can implement Category later? Since it is a relatively complex issue?
# class Category(models.Model):
#     name = models.CharField(max_length=100)
#     # User might not make sense here actually. Because categories belong to income, transaction, budget.
#     # But how can a user arrange his/her categories though?
#     user = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name="categories")
