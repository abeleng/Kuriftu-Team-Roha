# Generated by Django 5.0.4 on 2025-04-11 22:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_feedback'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='category',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='feedback',
            name='priority',
            field=models.CharField(choices=[('positive', 'Positive'), ('negative', 'Negative'), ('neutral', 'Neutral')], default='neutral', max_length=10),
        ),
    ]
