from django.db import models
from django.utils.translation import gettext_lazy as _  


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name=_("Category Name")
    )
    description = models.TextField(
        blank=True,
        verbose_name=_("Description")
    )
    image = models.ImageField(
        upload_to='category_images/',
        null=True,
        blank=True,
        verbose_name=_("Image")
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        return str(self.name)


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        related_name='products',
        on_delete=models.CASCADE,
        verbose_name=_("Category")
    )
    name = models.CharField(
        max_length=255,
        verbose_name=_("Product Name")
    )
    description = models.TextField(
        blank=True,
        verbose_name=_("Description")
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name=_("Price")
    )
    is_available = models.BooleanField(
        default=True,
        verbose_name=_("Available")
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Created At")
    )
    image = models.ImageField(
        upload_to='product_images/',
        null=True,
        blank=True,
        verbose_name=_("Image")
    )

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def __str__(self):
        return str(self.name)
