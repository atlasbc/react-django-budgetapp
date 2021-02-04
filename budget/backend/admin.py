from django.contrib import admin
from .models import Dummy, User, Income, Transaction, Budget

# Register your models here.
admin.site.register(Dummy)
admin.site.register(User)
admin.site.register(Income)
admin.site.register(Transaction)
admin.site.register(Budget)
