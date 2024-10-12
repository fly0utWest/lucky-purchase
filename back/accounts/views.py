from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from .serializers import RegisterSerializer  
from .models import CustomUser

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer  

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Генерация токена
        token = AccessToken.for_user(user)

        return Response({
            'username': user.username,
            'email': user.email,
            'token': str(token),  # Возвращаем токен в ответе
        })