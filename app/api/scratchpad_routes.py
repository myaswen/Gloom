from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Scratchpad

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
