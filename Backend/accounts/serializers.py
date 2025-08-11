from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.translation import gettext_lazy as _  


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=6,
        error_messages={
            "blank": _("Password cannot be blank."),
            "min_length": _("Password must be at least 6 characters."),
        }
    )

    class Meta:
        model = User
        fields = ['id', 'name', 'phone', 'email', 'password']
        extra_kwargs = {
            'name': {'error_messages': {'blank': _("Name is required.")}},
            'email': {'error_messages': {'blank': _("Email is required."), 'invalid': _("Enter a valid email address.")}},
            'phone': {'error_messages': {'blank': _("Phone number is required.")}},
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        token['phone'] = user.phone
        return token
