from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, User
from app.forms.dashboard_image_form import DashboardImageForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# ------------------------------------------------------------
# Edit a user's dashboard image:
# ------------------------------------------------------------
@user_routes.route("/dashboard", methods=['PUT'])
@login_required
def edit_dashboard_image():

    # Instantiate form instance for data validation:
    form = DashboardImageForm()

    # Data from the request is passed in automatically,
    # but the CSRF token needs to be added manually:
    form['csrf_token'].data = request.cookies['csrf_token']

    # Run form validations on recieved data:
    if form.validate_on_submit():
        # Perform edits to instance data:
        current_user.dashboard_image = form.data["dashboardImage"]
        db.session.commit()
        return current_user.to_dict(), 200

    # Return response if the form validations fail:
    return { "errors": form.errors }, 400
