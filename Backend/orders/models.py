# pylint: disable=no-member
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from catalog.models import Product

class Order(models.Model):
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name=_("Client"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created At"))
    is_sent = models.BooleanField(default=False, verbose_name=_("Is Sent"))

    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")

    def __str__(self):
        return _("Order #%(id)s by %(client)s") % {"id": self.id, "client": self.client}


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE, verbose_name=_("Order"))
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_("Product"))
    quantity = models.PositiveIntegerField(default=1, verbose_name=_("Quantity"))

    class Meta:
        verbose_name = _("Order Item")
        verbose_name_plural = _("Order Items")

    def __str__(self):
        return _("%(quantity)s x %(product)s") % {"quantity": self.quantity, "product": self.product.name}
