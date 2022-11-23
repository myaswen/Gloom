from flask import Blueprint
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import Notebook, Page

notebook_routes = Blueprint('notebooks', __name__)


# ------------------------------------------------------------
# Get all of the pages in a notebook:
# ------------------------------------------------------------
@notebook_routes.route("/<int:notebook_id>/pages")
@login_required
def get_notebook_pages(notebook_id):

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Check if a notebook with the given id exists:
    try:
        notebook = Notebook.query.get_or_404(notebook_id)
    except:
        return { "errors": { "notFound": "Notebook not found" } }, 404

    # Check if the current user owns the given notebook:
    if (notebook.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this notebook" } }, 403

    # Find all the pages associated with the given notebook id,
    # and order them descending by their last edited date:
    pages = Page.query.filter(Page.notebook_id == notebook_id).order_by(
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
