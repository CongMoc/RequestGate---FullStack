from django.db import models
from django.contrib.auth.models import User as AuthUser

class Department(models.Model):
    name = models.CharField(max_length=250)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Role(models.Model):
    role = models.CharField(max_length=100)

    def __str__(self):
        return self.role

class UserProfile(models.Model):
    user = models.OneToOneField(AuthUser, on_delete=models.CASCADE, related_name='profile')
    nickname = models.CharField(max_length=100)
    fullname = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    phone = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.fullname

    def is_admin(self):
        return self.role.id == 0 or self.role.role == 'Admin'

    def is_manager(self):
        return self.role.id == 1 or self.role.role == 'Manager'

    def get_department_id(self):
        return self.department.id


class Request(models.Model):
    type = models.CharField(max_length=50)
    idSender = models.ForeignKey(User, related_name='sent_requests', on_delete=models.CASCADE)
    idReceiver = models.ForeignKey(User, related_name='received_requests', on_delete=models.CASCADE)
    idAssignee = models.ForeignKey(User, related_name='assigned_requests', on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    content = models.TextField()
    status = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    date = models.DateField()
    resolution = models.TextField(blank=True, null=True)
    idUserEdit = models.ForeignKey(User, related_name='edited_requests', on_delete=models.SET_NULL, null=True, blank=True)
    nearCommentTime = models.ForeignKey('Comment', related_name='recent_comments', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.subject

class Comment(models.Model):
    idRequest = models.ForeignKey(Request, related_name='comments', on_delete=models.CASCADE)
    idUserComment = models.ForeignKey(User, related_name='user_comments', on_delete=models.CASCADE)
    change = models.TextField()
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)  # Adding timestamp to track comment time

    def __str__(self):
        return f"Comment by {self.idUserComment} on {self.idRequest}"

