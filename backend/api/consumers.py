from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import async_to_sync

class ApiConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        self.room_group_name = 'chat'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        # await self.send(text_data=json.dumps({
        #     'type': "Auth",
        #     'message': "Connection Established!"
        # }))

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
        # print("DATA : ", data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message', #Message Routing: broadcasts the message to all consumers in the specified group.
                'sender': sender,
                'message': message
            }
        )
        # await self.send(text_data=json.dumps({
        #     'type': "Chat",
        #     'message': message
        # }))

    async def chat_message(self, event): #Message Routing 
        sender = event.get("sender")
        message = event.get('message')
        await self.send(text_data=json.dumps({
            'type': 'chat',
            'sender': sender,
            'message': message
        }))
