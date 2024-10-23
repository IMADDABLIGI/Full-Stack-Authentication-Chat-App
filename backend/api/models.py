from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

# The cmd migrate is responsible for provision the database so it has the correct tables and everything setup
# ORM Object relational mapping, it writes the model defintion in python and then Django automatically handels
#converting this into the correct database code.
# Inisde of model we define the python version of our models which type of fields we want to store on this model
#on in this data {Note} or table and then Django automatically map it for us {ORM} and add the corresponding rows tables rows Etc...