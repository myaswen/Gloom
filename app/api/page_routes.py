from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from datetime import datetime
from app.models import db, Page, Tag
from app.forms.page_form import PageForm

page_routes = Blueprint('pages', __name__)


# ------------------------------------------------------------
# Get all of the current user's pages:
# ------------------------------------------------------------
@page_routes.route("")
@login_required
def get_all_user_pages():

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

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


# ------------------------------------------------------------
# Edit a page:
# ------------------------------------------------------------
@page_routes.route("/<int:page_id>", methods=['PUT'])
@login_required
def edit_page(page_id):

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Check if a page with the given id exists:
    try:
        current_page = Page.query.get_or_404(page_id)
    except:
        return { "errors": { "notFound": "Page not found" } }, 404

    # Check if the current user owns the given page:
    if (current_page.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this page" } }, 403

    # Instantiate form instance for data validation:
    form = PageForm()

    # Data from the request is passed in automatically,
    # but the CSRF token needs to be added manually:
    form['csrf_token'].data = request.cookies['csrf_token']

    # Run form validations on recieved data:
    if form.validate_on_submit():
        # Perform edits to instance data:
        current_page.title = form.data["title"]
        current_page.content = form.data["content"]
        current_page.updated_at = datetime.utcnow()
        db.session.commit()

        # Format and return the edited instance:
        current_page_dict = current_page.to_dict()
        current_page_dict["Tags"] = [tag.to_dict() for tag in current_page.tags]
        return current_page_dict, 200

    # Return response if the form validations fail:
    return { "errors": form.errors }, 400


# ------------------------------------------------------------
# Delete a page:
# ------------------------------------------------------------
@page_routes.route("/<int:page_id>", methods=['DELETE'])
@login_required
def delete_page(page_id):

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Check if a page with the given id exists:
    try:
        current_page = Page.query.get_or_404(page_id)
    except:
        return { "errors": { "notFound": "Page not found" } }, 404

    # Check if the current user owns the given page:
    if (current_page.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this page" } }, 403

    # Delete the page instance:
    db.session.delete(current_page)
    db.session.commit()
    return {"status": "Page successfully deleted"}, 200


# ------------------------------------------------------------
# Add a tag to a page:
# ------------------------------------------------------------
@page_routes.route("/<int:page_id>/tags/<int:tag_id>", methods=['POST'])
@login_required
def add_page_tag(page_id, tag_id):

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Check if a page with the given id exists:
    try:
        current_page = Page.query.get_or_404(page_id)
    except:
        return { "errors": { "notFound": "Page not found" } }, 404

    # Check if the current user owns the given page:
    if (current_page.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this page" } }, 403

    # Check if a tag with the given id exists:
    try:
        tag = Tag.query.get_or_404(tag_id)
    except:
        return { "errors": { "notFound": "Tag not found" } }, 404

    # Check if the current user owns the given tag:
    if (tag.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this tag" } }, 403

    # Check if the page already has the tag:
    if (tag in current_page.tags):
        return { "errors": { "Duplicate": "Tag already added to this page" } }, 403


    # Add the tag to the target page:
    current_page.tags.append(tag)
    db.session.commit()

    return {"status": "Tag successfully add to page"}, 201
