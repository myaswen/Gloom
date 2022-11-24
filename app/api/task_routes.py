from flask import Blueprint
from flask_login import login_required
from app.models import User

task_routes = Blueprint('tasks', __name__)
