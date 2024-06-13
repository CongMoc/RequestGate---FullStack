from django.urls import path
from . import views


urlpatterns = [
    path('check-email/', views.CheckEmailView.as_view(), name='check-email'),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/check-role/', views.CheckAdminRoleAPIView.as_view(), name='check-role'),
    path('departments/', views.DepartmentListView.as_view(), name='department-list'),
    path('roles/', views.RoleListView.as_view(), name='role-list'),
    path('register/', views.UserProfileCreateView.as_view(), name = 'register'),
    path('update/<str:user__username>/', views.UserProfileUpdateView.as_view(), name='update-profile'),
    path('current/', views.CurrentUserProfileView.as_view(), name='current-profile'),
    path('users/', views.UserProfileViewSet.as_view({'get':'list'}), name = 'user-profile'),
]