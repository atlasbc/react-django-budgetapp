# Generated by Django 3.1.5 on 2021-03-02 13:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_auto_20210219_2011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='income',
            name='created_at',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='created_at',
            field=models.DateField(default=datetime.date.today),
        ),
    ]