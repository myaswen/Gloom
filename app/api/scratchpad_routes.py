from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Scratchpad
from app.forms.scratchpad_form import ScratchpadForm

scratchpad_routes = Blueprint('scratchpads', __name__)


# ------------------------------------------------------------
# Get the current user's scratchpad:
# ------------------------------------------------------------
@scratchpad_routes.route("")
@login_required
def get_user_scratchpad():

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Find the current user's scratchpad:
    scratchpad = Scratchpad.query.filter(Scratchpad.user_id == current_user_id).first()

    # If for some reason the user doesn't
    # have a scratchpad, return an error:
    if scratchpad is None:
        return { "errors": { "notFound": "Scratchpad not found" } }, 404

    return(scratchpad.to_dict())


# ------------------------------------------------------------
# Edit a scratchpad:
# ------------------------------------------------------------
@scratchpad_routes.route("/<int:scratchpad_id>", methods=['PUT'])
@login_required
def edit_scratchpad(scratchpad_id):

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Check if a scratchpad with the given id exists:
    try:
        current_scratchpad = Scratchpad.query.get_or_404(scratchpad_id)
    except:
        return { "errors": { "notFound": "Scratchpad not found" } }, 404

    # Check if the current user owns the given scratchpad:
    if (current_scratchpad.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this scratchpad" } }, 403

    # Instantiate form instance for data validation:
    form = ScratchpadForm()

    # Data from the request is passed in automatically,
    # but the CSRF token needs to be added manually:
    form['csrf_token'].data = request.cookies['csrf_token']

    # Run form validations on recieved data:
    if form.validate_on_submit():
        # Perform edits to instance data:
        current_scratchpad.content = form.data["content"]
        current_scratchpad.updated_at = datetime.utcnow()
        db.session.commit()
        return current_scratchpad.to_dict(), 200

    # Return response if the form validations fail:
    return { "errors": form.errors }, 400
