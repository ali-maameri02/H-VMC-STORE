from django.contrib import admin
from django.urls import path, reverse
from django.utils.html import format_html
from django.shortcuts import redirect
from django.utils.translation import gettext_lazy as _  

from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1
    autocomplete_fields = ['product']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'client_link', 'created_at', 'is_sent', 'view_items_link']
    list_filter = ['is_sent', 'created_at']
    search_fields = ['client__email', 'client__name']
    inlines = [OrderItemInline]
    change_list_template = "admin/orders/order_change_list.html"  

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path("export-to-sheet/", self.admin_site.admin_view(self.redirect_to_oauth), name="export_to_sheet"),
        ]
        return custom_urls + urls

    def redirect_to_oauth(self, request):
        return redirect(reverse("oauth2_init"))  

    def client_link(self, obj):
        url = reverse("admin:accounts_user_change", args=[obj.client.id])
        return format_html('<a href="{}">{}</a>', url, obj.client.email)
    client_link.short_description = _('Client')  
    client_link.admin_order_field = 'client__email'

    def view_items_link(self, obj):
        return format_html(
            '<a href="{}">{}</a>',
            reverse('admin:orders_order_change', args=[obj.id]),
            _('View Items')  
        )
    view_items_link.short_description = _("Items")  
