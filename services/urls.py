from django.contrib import admin
from django.urls import path,include
from .views import get_service,get_services,toggle_booking
urlpatterns = [
    path('get-services',get_services),
    path('service/<str:id>/',get_service),
    path('toggle-booking/<str:service_id>/', toggle_booking, name='toggle_booking')
]
