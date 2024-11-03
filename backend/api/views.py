from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all        # Specifie a list of all the different object that will be looking at when creating a new one to make sure not to create a user that already exsiste
    serializer_class = UserSerializer  # Tell this view what kind of data we need to accept a new user {username and a password}
    permission_classes = [AllowAny]    # Specifie who can actually call to use this view even if not authenticated to create a new user
 
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # Call the parent method to get the token data
        response = super().post(request, *args, **kwargs)
        
        # Extract tokens from response data
        access_token = response.data['access']
        refresh_token = response.data['refresh']
        
        # Set cookies for access and refresh tokens
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,  # Prevents JavaScript access
            secure=False,    # Use True in production (HTTPS)
            expires=timezone.now() + timedelta(days=7)  # Set expiration
        )
        print("--------------------")
        # print("ACCESS:", access_token)
        print("Cookie has been created")
        
        # response.set_cookie(
        #     key='refresh_token',
        #     value=refresh_token,
        #     httponly=True,
        #     secure=False,  
        #     expires=timezone.now() + timedelta(days=7)  # Set expiration
        # )

        return response