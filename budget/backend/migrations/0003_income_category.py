# Generated by Django 3.1.5 on 2021-02-15 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_remove_income_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='income',
            name='category',
            field=models.CharField(choices=[('Salary', 'Salary'), ('Bonus', 'Bonus'), ('Side', 'Side'), ('Other', 'Other')], default='Others', max_length=100),
            preserve_default=False,
        ),
    ]
