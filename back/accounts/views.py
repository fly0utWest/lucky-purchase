from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from .serializers import RegisterSerializer, CheckUserSerializer
from .models import CustomUser
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

CustomUser = get_user_model()


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer  

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        
        token = AccessToken.for_user(user)

        return Response({
            'username': user.username,
            'email': user.email,
            'token': str(token),  
        })


class CheckUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CheckUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        username = serializer.validated_data.get('username')
        email = serializer.validated_data.get('email')

        if username:
            user = CustomUser.objects.filter(username=username).first()
        elif email:
            user = CustomUser.objects.filter(email=email).first()

        if user:
            return Response({"exists": True}, status=status.HTTP_200_OK)
        else:
            return Response({"exists": False}, status=status.HTTP_404_NOT_FOUND)




class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  
        return Response({
            'username': user.username,
            'email': user.email,
        })