from django.db import models
from user.models import CustomUser
class Service(models.Model):
    CATEGORY_CHOICES = [
        ('wellness', 'Wellness'),
        ('fitness', 'Fitness'),
        ('beauty', 'Beauty'),
        ('therapy', 'Therapy'),
    ]

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    image = models.URLField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,default=0.00)
    rating = models.FloatField(blank=True, null=True)
    duration = models.CharField(max_length=50,blank=True, null=True)
    location = models.CharField(max_length=255,blank=True, null=True)
    capacity = models.CharField(max_length=100)
    featured = models.BooleanField(default=False,blank=True, null=True)
    gallery = models.JSONField(default=list,blank=True, null=True)  # Stores a list of image URLs
    highlights = models.JSONField(default=list,blank=True, null=True)  # Stores a list of highlights
    includes = models.JSONField(default=list,blank=True, null=True)  # Stores a list of included items
    schedule = models.JSONField(default=list,blank=True, null=True)  # Stores a list of schedule times

    def __str__(self):
        return self.title

class ServiceBooking(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="service_bookings")
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="bookings")
    booking_date = models.DateTimeField(auto_now_add=True)
    scheduled_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('cancelled', 'Cancelled')], default='pending')

    def __str__(self):
        return f"{self.user} - {self.service.title} on {self.scheduled_date}"