from flask import Blueprint
from flask_login import login_required
from app.models import User

scratchpad_routes = Blueprint('scratchpads', __name__)
