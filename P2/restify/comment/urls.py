from django.urls import path
from .views import AddCommentView, CommentView

app_name="comment"
# Comments (18 marks)
# View comments (8 marks) 
    # For Guest/Property (6 marks)
    # Can distinguish reply from comment (2 marks)
    # -2 marks without pagination support
# Write comments/reply (10 marks)

# Note: remember the requirements on who can comment/reply and how many times.
urlpatterns = [
    path('property/<str:property_id>/add/', AddCommentView.as_view(), name='addcomment'),
    path('property/<str:property_id>/all/', CommentView.as_view(), name='comments'),
    # path('add-comment/', AddCommentView.as_view(), name='addcomment'),
    # path('comments/', CommentView.as_view(), name='comments'),
]
