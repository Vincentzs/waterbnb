from django.urls import path
from .views.property_view import AddCommentView, AllCommentView, DetailCommentView
from .views.guest_view import AddHostToGuestCommentView, HostToGuestAllCommentView

app_name="comment"
# Comments (18 marks)
# View comments (8 marks) 
    # For Guest/Property (6 marks)
    # Can distinguish reply from comment (2 marks)
    # -2 marks without pagination support
# Write comments/reply (10 marks)

# Note: remember the requirements on who can comment/reply and how many times.
urlpatterns = [
    path('property/<str:property_id>/add/', AddCommentView.as_view(), name='comments_add'),
    path('property/<str:property_id>/', AllCommentView.as_view(), name='comments'),
    path('property/<str:property_id>/<int:pk>/', DetailCommentView.as_view(), name='comments_detail'),
    
    path('property/<str:property_id>/guest/<str:guest_id>/add/', AddHostToGuestCommentView.as_view(), name='comments_add_host_to_guest'),
    path('property/<str:property_id>/guest/', HostToGuestAllCommentView.as_view(), name='comments_host_to_guest'),
]
