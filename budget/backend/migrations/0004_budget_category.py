# Generated by Django 3.1.5 on 2021-02-16 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_income_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='budget',
            name='category',
            field=models.CharField(choices=[('Grocery', 'Grocery'), ('Bills & Utilities', 'Bills & Utilities'), ('Entertainment', 'Entertainment'), ('Other', 'Other')], default='Other', max_length=100),
            preserve_default=False,
        ),
    ]