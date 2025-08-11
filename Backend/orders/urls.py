from django.urls import path
from .views import OrderCreateView, OrderHistoryView, OrderDetailView



urlpatterns = [
    path('', OrderCreateView.as_view(), name='order-create'),                  # POST
    path('my-orders/', OrderHistoryView.as_view(), name='order-history'),      # GET
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),         # GET, PUT, PATCH, DELETE
    
]
