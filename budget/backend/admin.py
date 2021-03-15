from django.contrib import admin
from .models import User, Income, Transaction, Budget

# Register your models here.
admin.site.register(User)
admin.site.register(Income)
admin.site.register(Transaction)
# admin.site.register(Budget)
