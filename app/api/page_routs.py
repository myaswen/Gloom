from flask import Blueprint
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import Page

page_routes = Blueprint('pages', __name__)


# ------------------------------------------------------------
# Get all of the current user's pages:
# ------------------------------------------------------------
@page_routes.route("")
@login_required
def get_all_user_pages():

    # Get the current user's id:
    current_user_id = current_user.get_id()

    # Find all the pages that the current user owns,
    # and order them descending by their last edited date:
    pages = Page.query.filter(Page.user_id == current_user_id).order_by(
        Page.updated_at.desc()).options(joinedload(Page.tags)).all()

    # Set up initial response format:
    response = {
        "Pages": []
    }

    # Convert pages (and associated tags) to dictionaries,
    # and append each page to the response:
    for page in pages:
        page_dict = page.to_dict()
        page_dict["Tags"] = [tag.to_dict() for tag in page.tags]
        response["Pages"].append(page_dict)

    return(response)
