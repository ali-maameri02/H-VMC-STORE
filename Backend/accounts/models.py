from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _  

class UserManager(BaseUserManager):
    def create_user(self, email, name, phone, wilaya, address, password=None, **extra_fields):
        if not email:
            raise ValueError(_("Email is required"))  
        email = self.normalize_email(email)
        user = self.model(
            email=email, 
            name=name, 
            phone=phone,
            wilaya=wilaya,
            address=address,
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, name, phone, wilaya, address, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if not extra_fields.get("is_staff"):
            raise ValueError(_("Superuser must have is_staff=True."))
        if not extra_fields.get("is_superuser"):
            raise ValueError(_("Superuser must have is_superuser=True."))

        return self.create_user(
            email, 
            name, 
            phone, 
            wilaya, 
            address, 
            password, 
            **extra_fields
        )

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name=_("Email address"))
    name = models.CharField(max_length=100, verbose_name=_("Full name"))
    phone = models.CharField(max_length=20, verbose_name=_("Phone number"))
    wilaya = models.CharField(max_length=50, verbose_name=_("Wilaya"),null=True)
    address = models.TextField(verbose_name=_("Address"),null=True)
    is_active = models.BooleanField(default=True, verbose_name=_("Active"))
    is_staff = models.BooleanField(default=False, verbose_name=_("Staff status"))

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "phone", "wilaya", "address"]

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return str(self.email)