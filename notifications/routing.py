# filepath: c:\Users\Edeal\Downloads\project-bolt-sb1-oxlxsr42\backend\chat\routing.py
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/notifications/', consumers.NotificationConsumer.as_asgi()),
]