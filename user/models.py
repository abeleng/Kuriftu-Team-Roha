from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid



class CustomUserManager(BaseUserManager):
    """Custom manager for user model with email authentication"""

    def create_user(self, email, password=None, user_type="normal", **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPES = [
        ("normal", "Normal User"),
        ("counselor", "College Counselor"),
        ("admin", "Admin"),
    ]
    
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    room_no = models.CharField(max_length=10,blank=True, null=True)
    phone_number = models.CharField(max_length=15,blank=True, null=True)
    stay_period_start = models.DateField(blank=True, null=True)
    stay_period_end = models.DateField(blank=True, null=True)
    preferences = models.JSONField(default=list, blank=True,null=True)
    optional_services = models.JSONField(default=list, blank=True,null=True)
    is_customer = models.BooleanField(default=True)
    status = models.CharField(max_length=20, default='active')   
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_checked_in = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = CustomUserManager()
    
    def has_profile(self):
        """
        Returns True if the user has the required profile attributes, otherwise False.
        """
        # Check if stay_period_start and stay_period_end are set
        if not self.stay_period_start or not self.stay_period_end:
            return False

        # Check if preferences are set (optional, can be empty)
        if self.preferences is None:
            return False

        # Check if optional_services contains the required keys
        if self.optional_services:
            if not isinstance(self.optional_services, dict):
                return False
            required_keys = ['earlyCheckIn', 'airportPickup']
            for key in required_keys:
                if key not in self.optional_services:
                    return False

        return True

    def __str__(self):
        return self.email

INTENTION_CHOICES = [
    ('positive', 'Positive'),
    ('negative', 'Negative'),
    ('neutral', 'Neutral'),
]
class Feedback(models.Model):

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="feedbacks")
    rating = models.PositiveSmallIntegerField()  # Rating out of 5
    text = models.TextField(blank=True, null=True)  # Optional feedback text
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when feedback was created
    priority = models.CharField(max_length=10, choices=INTENTION_CHOICES, default='neutral')
    category = models.CharField(max_length=50, blank=True, null=True)  # Optional feedback category

    def __str__(self):
        return f"Feedback by {self.user.email} - Rating: {self.rating}"
    
class Room(models.Model):
    number= models.CharField(max_length=10, unique=True)
    occupied= models.BooleanField(default=False)
    current_guest = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name="current_room"
    )

class CheckInLog(models.Model):
    guest = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="check_in_logs")
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="check_in_logs")
    action = models.CharField(max_length=10, choices=[('check_in', 'Check In'), ('check_out', 'Check Out')])
    timestamp = models.DateTimeField(auto_now_add=True)
    additional_info = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.guest.name} - {self.action} - Room {self.room.number} - {self.timestamp}"
    
