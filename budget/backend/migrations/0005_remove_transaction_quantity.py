# Generated by Django 3.1.5 on 2021-02-19 13:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_budget_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='quantity',
        ),
    ]
