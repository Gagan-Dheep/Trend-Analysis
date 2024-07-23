from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_page, name='home'),
    path('api/register/', views.register_view, name='register'),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('home/predict/', views.predict_engagement, name='predict'),
    path('api/check-session/', views.check_session, name='session'),
]

