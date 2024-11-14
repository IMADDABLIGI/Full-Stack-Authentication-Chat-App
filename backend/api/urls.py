from django.urls import path
from .views import CustomTokenObtainPairView, CreateUserView, check_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("token/checktoken/", check_token, name="check_token"),
]

