from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from datetime import datetime
from app.models import db, Notebook, Page
from app.forms.page_form import PageForm
from app.forms.notebook_form import NotebookForm

notebook_routes = Blueprint('notebooks', __name__)


# ------------------------------------------------------------
# Get all of the current user's notebooks:
# ------------------------------------------------------------
@notebook_routes.route("")
@login_required
def get_all_user_notebooks():

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Find all the notebooks that the current user owns,
    # and order them descending by their last edited date:
    notebooks = Notebook.query.filter(Notebook.user_id == current_user_id).order_by(
        Notebook.updated_at.desc()).all()

    # Set up initial response format:
    response = {
        "Notebooks": []
    }

    # Convert notebooks to dictionaries,
    # and append each notebook to the response:
    for notebook in notebooks:
        response["Notebooks"].append(notebook.to_dict())

    return(response)


# ------------------------------------------------------------
# Create a notebook:
# ------------------------------------------------------------
@notebook_routes.route("", methods=['POST'])
@login_required
def create_notebook():

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Instantiate form instance for data validation:
    form = NotebookForm()

    # Data from the request is passed in automatically,
    # but the CSRF token needs to be added manually:
    form['csrf_token'].data = request.cookies['csrf_token']

    # Run form validations on recieved data:
    if form.validate_on_submit():
        # Create a new page instance:
        new_notebook = Notebook(
            user_id = current_user_id
        )
        db.session.add(new_notebook)
        db.session.commit()
        return new_notebook.to_dict(), 201

    # Return response if the form validations fail:
    return { "errors": form.errors }, 400


# ------------------------------------------------------------
# Edit a notebook:
# ------------------------------------------------------------
@notebook_routes.route("/<int:notebook_id>", methods=['PUT'])
@login_required
def edit_notebook(notebook_id):

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Check if a notebook with the given id exists:
    try:
        current_notebook = Notebook.query.get_or_404(notebook_id)
    except:
        return { "errors": { "notFound": "Notebook not found" } }, 404

    # Check if the current user owns the given notebook:
    if (current_notebook.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this notebook" } }, 403

    # Instantiate form instance for data validation:
    form = NotebookForm()

    # Data from the request is passed in automatically,
    # but the CSRF token needs to be added manually:
    form['csrf_token'].data = request.cookies['csrf_token']

    # Run form validations on recieved data:
    if form.validate_on_submit():
        # Perform edits to instance data:
        current_notebook.name = form.data["name"]
        current_notebook.updated_at = datetime.utcnow()
        db.session.commit()
        return current_notebook.to_dict(), 200

    # Return response if the form validations fail:
    return { "errors": form.errors }, 400


# ------------------------------------------------------------
# Delete a notebook:
# ------------------------------------------------------------
@notebook_routes.route("/<int:notebook_id>", methods=['DELETE'])
@login_required
def delete_notebook(notebook_id):

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Check if a notebook with the given id exists:
    try:
        current_notebook = Notebook.query.get_or_404(notebook_id)
    except:
        return { "errors": { "notFound": "Notebook not found" } }, 404

    # Check if the current user owns the given notebook:
    if (current_notebook.user_id != current_user_id):
        return { "errors": { "Forbidden": "User is not authorized to access this notebook" } }, 403

    # Delete the notebook instance:
    db.session.delete(current_notebook)
    db.session.commit()
    return {"status": "Notebook successfully deleted"}, 200


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


# ------------------------------------------------------------
# Create a page:
# ------------------------------------------------------------
@notebook_routes.route("/<int:notebook_id>/pages", methods=['POST'])
@login_required
def create_page(notebook_id):

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

    # Instantiate form instance for data validation:
    form = PageForm()

    # Data from the request is passed in automatically,
    # but the CSRF token needs to be added manually:
    form['csrf_token'].data = request.cookies['csrf_token']

    # Run form validations on recieved data:
    if form.validate_on_submit():
        # Create a new page instance:
        new_page = Page(
            user_id = current_user_id,
            notebook_id = notebook_id
        )
        db.session.add(new_page)
        db.session.commit()

        # Format and return the new instance:
        new_page_dict = new_page.to_dict()
        new_page_dict["Tags"] = []
        return new_page_dict, 201

    # Return response if the form validations fail:
    return { "errors": form.errors }, 400
