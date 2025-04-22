from django.db import models
from django.conf import settings

class Chat(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="chats")
    created_at = models.DateTimeField(auto_now_add=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    def __str__(self):
        return f"Chat {self.id} - Participants: {', '.join([user.email for user in self.participants.all()])}"

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="messages", null=True, blank=True
    )  # Allow null for bot messages
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self.id} from {self.sender.email if self.sender else 'Bot'} in Chat {self.chat.id}"