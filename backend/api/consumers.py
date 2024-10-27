from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync

class ApiConsumer(WebsocketConsumer):
    def connect(self):

        self.room_group_name = 'chat'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        # await self.send(text_data=json.dumps({
        #     'type': "Auth",
        #     'message': "Connection Established!"
        # }))

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        
        print("--------------")
        message = data.get("message")
        print("DATA : ", message)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
        # await self.send(text_data=json.dumps({
        #     'type': "Chat",
        #     'message': message
        # }))

    def chat_message(self, event):
        message = event.get('message')
        self.send(text_data=json.dumps({
            'type':'chat',
            'message':message
        }))
