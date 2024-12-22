from django.db import models
from django.contrib.auth.models import User


class ChatConvo(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} to {self.receiver} at {self.timestamp}"

    class Meta:
        ordering = ['timestamp']  # Order messages by timestamp
        unique_together = ('sender', 'receiver', 'timestamp')  # Prevent duplicate messages



# The cmd migrate is responsible for provision the database so it has the correct tables and everything setup
# ORM Object relational mapping, it writes the model defintion in python and then Django automatically handels
#converting this into the correct database code.
# Inisde of model we define the python version of our models which type of fields we want to store on this model
#on in this data {Note} or table and then Django automatically map it for us {ORM} and add the corresponding rows tables rows Etc...