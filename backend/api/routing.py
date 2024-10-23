from django.urls import path
from . import consumers  # Replace with your actual consumer

websocket_urlpatterns = [
    path('ws/api/', consumers.ApiConsumer.as_asgi()),  # Adjust path and consumer
]