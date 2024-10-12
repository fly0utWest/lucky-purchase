from django.urls import path
from .views import ProductCreateView, ProductListView

urlpatterns = [
    path('create/', ProductCreateView.as_view(), name='product_create'),
    path('', ProductListView.as_view(), name='product_list'),
]