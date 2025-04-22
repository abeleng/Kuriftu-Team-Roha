from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Feedback, Room, CheckInLog

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'name', 'is_staff', 'is_active', 'status')  # Update fields to match your model
    ordering = ('email',)  # Use 'email' for ordering since 'username' is not present

    # Update fieldsets to remove references to 'username'
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name', 'room_no', 'phone_number', 'stay_period_start', 'stay_period_end', 'preferences')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Status', {'fields': ('status',)}),
    )

    # Update add_fieldsets for creating new users
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Feedback)
admin.site.register(Room)
admin.site.register(CheckInLog)
# admin.site.register(Room)