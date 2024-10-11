from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.handlers import make_password

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = ['username', 'password', 'email']
        extra_kwargs = {'password' : {'write_only' : True}}
        
        
        def create(self, validated_data):
            user = User(
                email = validated_data['email'],
                username = validated_data["username"]
            )
            
            user.password = make_password(validated_data["password"])
            user.save()
            return user