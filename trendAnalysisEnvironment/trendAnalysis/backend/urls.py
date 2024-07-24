from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [ 
    path('', views.home_page, name='home'),
    path('api/register/', views.register_view, name='register'),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('home/predict/', views.predict_engagement, name='predict'),    
    path('api/check-session/', views.check_session, name='session'),
]   + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) 
    