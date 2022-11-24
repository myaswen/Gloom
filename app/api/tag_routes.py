from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Tag

tag_routes = Blueprint('tags', __name__)


# ------------------------------------------------------------
# Get all of the current user's tags:
# ------------------------------------------------------------
@tag_routes.route("")
@login_required
def get_all_user_tags():

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Find all the tags that the current user owns,
    # and order them by name:
    tags = Tag.query.filter(Tag.user_id == current_user_id).order_by(
        Tag.name).all()

    # Set up initial response format:
    response = {
        "Tags": []
    }

    # Convert the tags to dictionaries,
    # and append each tag to the response:
    for tag in tags:
        response["Tags"].append(tag.to_dict())

    return(response)
