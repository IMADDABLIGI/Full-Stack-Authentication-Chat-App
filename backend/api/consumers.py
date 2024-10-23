from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ApiConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({
            'message': "Connection Established!"
        }))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        
        print("--------------")
        message = data.get("message")
        print("DATA : ", message)
        await self.send(text_data=json.dumps({
            'message': message
        }))