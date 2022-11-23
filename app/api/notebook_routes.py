from flask import Blueprint
from flask_login import login_required
from app.models import User

notebook_routes = Blueprint('notebooks', __name__)
