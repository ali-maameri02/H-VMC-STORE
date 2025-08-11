# pylint: disable=no-member

from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity']
        extra_kwargs = {
            'product': {'label': _("Product")},
            'quantity': {'label': _("Quantity")},
        }


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, label=_("Items"))

    class Meta:
        model = Order
        fields = ['id', 'client', 'created_at', 'is_sent', 'items']
        read_only_fields = ['id', 'created_at', 'client']
        extra_kwargs = {
            'client': {'label': _("Client")},
            'created_at': {'label': _("Created At")},
            'is_sent': {'label': _("Is Sent")},
        }

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        order = Order.objects.create(client=user, **validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', [])
        instance.is_sent = validated_data.get('is_sent', instance.is_sent)
        instance.save()

        if items_data:
            instance.items.all().delete()
            for item_data in items_data:
                OrderItem.objects.create(order=instance, **item_data)

        return instance
