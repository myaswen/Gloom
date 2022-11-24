from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Tag, Page
from app.forms.tag_form import TagForm
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


# ------------------------------------------------------------
# Create a tag:
# ------------------------------------------------------------
@tag_routes.route("", methods=['POST'])
@login_required
def create_tag():

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Instantiate form instance for data validation:
    form = TagForm()

    # Data from the request is passed in automatically,
    # but the CSRF token needs to be added manually:
    form['csrf_token'].data = request.cookies['csrf_token']

    # Run form validations on recieved data:
    if form.validate_on_submit():
        # Check if the tag name is unique:
        user_tags = Tag.query.filter(Tag.user_id == current_user_id).order_by(
            Tag.name).all()
        for tag in user_tags:
            if tag.name == form.data["name"]:
                return { "errors": { "unique": "Tag already exists" } }, 403

        # Create a new tag instance:
        new_tag = Tag(
            user_id = current_user_id,
            name = form.data["name"]
        )
        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict(), 201

    # Return response if the form validations fail:
    return { "errors": form.errors }, 400


# ------------------------------------------------------------
# Delete a tag:
# ------------------------------------------------------------
@tag_routes.route("/<int:tag_id>", methods=['DELETE'])
@login_required
def delete_tag(tag_id):

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Check if a tag with the given id exists:
    try:
        current_tag = Tag.query.get_or_404(tag_id)
    except:
        return { "errors": { "notFound": "Tag not found" } }, 404

    # Check if the current user owns the given tag:
    if (current_tag.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this tag" } }, 403

    # Delete the tag instance:
    db.session.delete(current_tag)
    db.session.commit()
    return {"status": "Tag successfully deleted"}, 200


# ------------------------------------------------------------
# Get all of the pages that belong to a tag:
# ------------------------------------------------------------
@tag_routes.route("/<int:tag_id>/pages")
@login_required
def get_tag_pages(tag_id):

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Check if a tag with the given id exists:
    try:
        tag = Tag.query.get_or_404(tag_id)
    except:
        return { "errors": { "notFound": "Tag not found" } }, 404

    # Check if the current user owns the given tag:
    if (tag.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this tag" } }, 403

    # Find all the pages that the current user owns,
    # and order them descending by their last edited date:
    pages = Page.query.filter(Page.user_id == current_user_id).order_by(
        Page.updated_at.desc()).options(joinedload(Page.tags)).all()

    # Set up initial response format:
    response = {
        "Pages": []
    }

    # Convert pages (and associated tags) to dictionaries,
    # and append each page to the response, if the page
    # has the associated tag:
    for page in pages:
        if tag in page.tags:
            page_dict = page.to_dict()
            page_dict["Tags"] = [tag.to_dict() for tag in page.tags]
            response["Pages"].append(page_dict)

    return(response)
