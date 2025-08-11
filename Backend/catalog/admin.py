from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _  
from .models import Category, Product
from django.contrib.auth.models import Group


admin.site.unregister(Group)
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'image_preview')
    search_fields = ('name',)
    ordering = ('name',)
    readonly_fields = ('image_preview',)  # Make preview visible in edit form
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover;" />', 
                obj.image.url
            )
        return "-"
    image_preview.short_description = _("Image Preview")
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'is_available', 'category', 'image_preview')
    list_filter = ('is_available', 'category')
    search_fields = ('name',)
    ordering = ('-created_at',)
    readonly_fields = ('image_preview',)  # Add this for edit view
    
    # List view image preview
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover;" />', 
                obj.image.url
            )
        return "-"
    image_preview.short_description = _("Image Preview")
    
    # Custom form to show preview when adding/editing
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['image'].help_text = _(
            'After selecting an image, save to see the preview.'
        )
        return form
    
    # Custom change form template to better display images
    change_form_template = 'admin/catalog/product/change_form.html'