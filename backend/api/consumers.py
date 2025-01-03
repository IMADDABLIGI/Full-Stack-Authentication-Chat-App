from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.contrib.auth.models import User
from asgiref.sync import async_to_sync
from asgiref.sync import sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from .models import ChatConvo
from channels.db import database_sync_to_async

class ApiConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Get cookies from the scope
        cookies = self.scope['cookies']
        token = cookies.get('access_token')

        if not token:
            print("No access token found in cookies.")
            await self.close()  # Close the connection if no token is present
        try:
            decode_token = AccessToken(token)
            payload_data = decode_token.payload
            user_id = payload_data.get('user_id')

            self.user_id = user_id # Store user_id in the instance for later use
            self.room_group_name = 'chat'

            # Join the room group
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()

        except Exception as e:
            print("Error decoding token:", e)
            await self.close()  # Close the connection on error

    async def disconnect(self, close_code):
        # pass
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        
        message = data.get("message")
        sender = data.get("sender")
        receiver = data.get("receiver")

        user1 = await sync_to_async (User.objects.filter(username=sender).first)()
        user2 = await sync_to_async (User.objects.filter(username=receiver).first)()
        # print("DATA : ", data)

        # Save the message to the ChatConvo model
        await self.save_message(user1, user2, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message', #Message Routing: broadcasts the message to all consumers instances in the specified group.
                # 'sender': sender,
                'message': message
            }
        )
        # await self.send(text_data=json.dumps({
        #     'type': "Chat",
        #     'message': message
        # }))

    async def chat_message(self, event): #Message Routing
        # sender = event.get('sender')
        message = event.get('message')
        await self.send(text_data=json.dumps({
            'type': 'new_message',
            # 'sender': sender,
            # 'message': message
            'message': message
            }))
    
    async def save_message(self, sender, receiver, message):
        # Save the ChatConvo instance in the database
        chat_convo = ChatConvo(sender=sender, receiver=receiver, message=message)
        await database_sync_to_async(chat_convo.save)()  # Save asynchronously