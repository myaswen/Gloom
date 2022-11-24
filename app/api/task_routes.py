from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Task
from app.forms.task_form import TaskForm

task_routes = Blueprint('tasks', __name__)


# ------------------------------------------------------------
# Get all of the current user's tasks:
# ------------------------------------------------------------
@task_routes.route("")
@login_required
def get_all_user_tasks():

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Find all the tasks of the current user,
    # and order them by their due date:
    tasks = Task.query.filter(Task.user_id == current_user_id).order_by(
        Task.due_date).all()

    # Set up initial response format:
    response = {
        "Tasks": []
    }

    # Convert tasks to dictionaries,
    # and append each task to the response:
    for task in tasks:
        response["Tasks"].append(task.to_dict())

    return(response)


# ------------------------------------------------------------
# Create a task:
# ------------------------------------------------------------
@task_routes.route("", methods=['POST'])
@login_required
def create_task():

    # Get the current user's id:
    current_user_id = int(current_user.get_id())

    # Instantiate form instance for data validation:
    form = TaskForm()

    # Data from the request is passed in automatically,
    # but the CSRF token needs to be added manually:
    form['csrf_token'].data = request.cookies['csrf_token']

    # Run form validations on recieved data:
    if form.validate_on_submit():
        # Create a new page instance:
        new_task = Task(
            user_id = current_user_id,
            content = form.data["content"],
            due_date = form.data["dueDate"] or None
        )
        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict(), 201

    # Return response if the form validations fail:
    return { "errors": form.errors }, 400
