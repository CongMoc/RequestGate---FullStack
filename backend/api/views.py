from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets
from . import serializers
from .serializers import UserProfileSerializer, RequestSerializer, CommentSerializer
from .models import UserProfile, Department, Role, Request, Comment
from rest_framework.decorators import api_view



class UserProfileCreateView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [AllowAny]

class UserProfileUpdateView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'user__username'  # Assuming each User has one UserProfile


class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class CurrentUserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile

class CheckEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = UserProfileSerializer()
            return Response({'check_Email': serializer.check_email(email)})
        except Exception as e:
            return Response({"message": "Email is empty."})


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenObtainPairSerializer

class DepartmentListView(generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = serializers.DepartmentSerializer
    permission_classes = [AllowAny,]

class RoleListView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = serializers.RoleSerializer
    permission_classes = [AllowAny]

class CheckAdminRoleAPIView(APIView):

    def post(self, request):
        serializer = serializers.CheckAdminRoleSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            username = serializer.validated_data.get('username')

            try:
                if email:
                    user = User.objects.get(email=email)
                else:
                    user = User.objects.get(username=username)

                user_profile = UserProfile.objects.get(user=user)
                is_admin = user_profile.is_admin()
                is_manager = user_profile.is_manager()
                id_department = user_profile.get_department_id()
                return Response({'is_admin': is_admin, 'is_manager': is_manager, 'id_department': id_department})

            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            except UserProfile.DoesNotExist:
                return Response({"error": "UserProfile not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)