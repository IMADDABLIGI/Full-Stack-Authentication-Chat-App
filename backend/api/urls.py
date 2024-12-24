from django.urls import path
from .views import CustomTokenObtainPairView, CreateUserView, check_token, get_conversation, get__last_convo
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("token/", CustomTokenObtainPairView.as_view(), name="get_token"),
    path("token/checktoken/", check_token, name="check_token"),
    path("get_conversation/<str:sender>/<str:receiver>/", get_conversation, name="get_convo"),
    path("get__last_convo/<str:sender>/<str:receiver>/", get__last_convo, name="get_lconvo"),
]

