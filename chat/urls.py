from django.contrib import admin
from django.urls import path,include
from .views import new_message,get_guests,get_messages,test
urlpatterns = [

    path('send-message',new_message),
    path('guests/',get_guests),
    path('test/<str:prompt>',test),
    path('messages/<int:guest_id>/',get_messages),  # Adjusted to include guest_id in the URL
    
]
