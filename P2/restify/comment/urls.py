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
    path('<int:property_id>/comments/', AddCommentView.as_view(), name='addcomment'),
    path('<str:pk>/add-comment/', CommentView.as_view(), name='comments'),

]
