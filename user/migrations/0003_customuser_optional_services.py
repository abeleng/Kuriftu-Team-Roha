# Generated by Django 5.0.4 on 2025-04-11 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_customuser_phone_number_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='optional_services',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
    ]
