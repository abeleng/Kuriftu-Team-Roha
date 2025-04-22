from django.urls import path
from .views import add_feedback, feedback_analysis,get_guest_profiles,get_guest_profile, get_analytics_data,get_recent_activities, register_user, CustomTokenObtainPairView, logout,get_user_profile,get_user_details, set_user_profile,test
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/register/', register_user, name='register'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', logout, name='logout'),
    path('api/user/', get_user_details),
    path('api/user-profile/',get_user_profile),
    path('api/set-profile/',set_user_profile),
    path('api/analytics/',get_analytics_data),
    path('api/recents/',get_recent_activities),
    path('api/guests/',get_guest_profiles),
    path('api/guests/<int:id>/',get_guest_profile),
    path('api/add-feedback/',add_feedback),
    path('api/feedback_analysis/',feedback_analysis),
    path('test',test)

]