# from django.core.exceptions import ObjectDoesNotExist
# from rest_framework import status
# from rest_framework.generics import CreateAPIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from property.models import Property
# from comment.models import Comment
# from user.models import RestifyUser
# # Create your views here.
# class AddCommentView(CreateAPIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         try:
#             Property = Property.objects.get(id=kwargs['property_id'])
#         except ObjectDoesNotExist:
#             return Response({"detail": "Property with id={id} does not exist".format(id=kwargs['property_id'])},
#                             status=status.HTTP_400_BAD_REQUEST)
#         else:
#             comment = Comment.objects.create(author=self.request.user, Property=Property, text=request.data['text'])
#         return Response(
#             {"user": comment.author.id, "Property": comment.property.id, "text": comment.text}
#             , status=status.HTTP_201_CREATED
#         )
