from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError, AccessToken
from rest_framework.decorators import api_view
from rest_framework.views import APIView

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
        
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=False,  
            expires=timezone.now() + timedelta(days=7)  # Set expiration
        )

        return response
    
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        # Extract the new access token
        new_access_token = response.data['access']
        
        # Update the access token cookie
        response.set_cookie(
            key='access_token',
            value=new_access_token,
            httponly=True,
            secure=True,
            samesite='Lax',
            expires=timezone.now() + timedelta(days=7)
        )

        return response
    

# @api_view(["GET"])
# def check_token(request):
#     # Access the access_token from cookies
#     access_token = request.COOKIES.get('access_token')

#     if not access_token:
#         return Response(data={"error": "No access token provided."}, status=status.HTTP_401_UNAUTHORIZED)

#     try:
#         # Decode the token to validate it
#         decode_token = AccessToken(access_token)
#         user_id = decode_token['user_id']  # Access user_id from the token payload

#         return Response(data={"user": user_id}, status=status.HTTP_200_OK)
#     except Exception as e:
#         print("Token decoding error:", e)
#         return Response(data={"error": "Invalid access token."}, status=status.HTTP_401_UNAUTHORIZED)
    # token = request.COOKIES.get('access_token')
    # decoded_token = AccessToken(token)
    # data = decoded_token.payload
    # user_id = data.get('user_id')
    # print("########")
    # print("User :", user_id)
    # user = User.objects.filter(id=user_id).first()
    # if user is not None:
    #     return Response(data={"user": user.username}, status=status.HTTP_200_OK)
    # return Response(data={'error': 'No access token found in cookies!'}, status=status.HTTP_400_BAD_REQUEST)


class checkToken(APIView):
    def post(self, request, format=None):
        username = request.data['user']
        print("HELLO USER ", username)
        return Response(data={"user": username}, status=status.HTTP_200_OK)