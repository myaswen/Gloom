from flask import Blueprint
from flask_login import login_required
from app.models import User

page_routes = Blueprint('pages', __name__)
