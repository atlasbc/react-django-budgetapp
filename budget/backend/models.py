from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date

# Create your models here.

SPENDING_CHOICES = [
    ('Grocery', 'Grocery'),
    ('Bills & Utilities', 'Bills & Utilities'),
    ('Entertainment', 'Entertainment'),
    ('Other', 'Other')
]

INCOME_CHOICES = [
    ('Salary', 'Salary'),
    ('Bonus', 'Bonus'),
    ('Side', 'Side'),
    ('Other', 'Other')
]


class Dummy(models.Model):
    name = models.CharField(max_length=100)
    message = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)


class User(AbstractUser):
    # TODO
    # total could be calculated by accounting for income, transactions etc.
    total = models.DecimalField(max_digits=8, decimal_places=2, default=0)


# class Category(models.Model):
#     CATEGORY_CHOICES = [
#         ('Grocery', 'Grocery'),
#         ('Bills & Utilities', 'Bills & Utilities'),
#         ('Entertainment', 'Entertainment'),
#         ('Other', 'Other')
#     ]
#     name = models.CharField(
#         max_length=100, choices=CATEGORY_CHOICES)
#     # User might not make sense here actually. Because categories belong to income, transaction, budget.
#     # But how can a user arrange his/her categories though?
#     user = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name="categories")


class Income(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="income")
    category = models.CharField(max_length=100, choices=INCOME_CHOICES)
    created_at = models.DateField(auto_now_add=True)


class Transaction(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    category = models.CharField(max_length=100, choices=SPENDING_CHOICES)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="transactions")
    created_at = models.DateField(auto_now_add=True)


class Budget(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="budget")
    category = models.CharField(max_length=100, choices=SPENDING_CHOICES)
    # category = models.ForeignKey(
    #     Category, on_delete=models.CASCADE, related_name="budget_categories")
