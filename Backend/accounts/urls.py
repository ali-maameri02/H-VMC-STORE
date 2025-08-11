from django.urls import path
from .views import RegisterView, CustomLoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='user-register'),
    path('login/', CustomLoginView.as_view(), name='user-login'),
    
]
