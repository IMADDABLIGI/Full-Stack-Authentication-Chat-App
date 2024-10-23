from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.

# this is a based class view that will allows us to implement creating a new user or like a registration form
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all        # Specifie a list of all the different object that will be looking at when creating a new one to make sure not to create a user that already exsiste
    serializer_class = UserSerializer  # Tell this view what kind of data we need to accept a new user {username and a password}
    permission_classes = [AllowAny]    # Specifie who can actually call to use this view even if not authenticated to create a new user
 
# Class to create a note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user) # return only the note of the specifique user

    def perform_create(self, serializer): ## This function is not neccesry to create the note but with it we can over right the function of creating the note
        if serializer.is_valid(): #check if all fields in serializer are correct 
            serializer.save(author=self.request.user) #add the user to the note
        else:
            print(serializer.errors)

# Class to delete a note
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self): #Delete notes that you own
        user = self.request.user
        return Note.objects.filter(author=user)