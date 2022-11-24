from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Task

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
    # and order them descending by their due date:
    tasks = Task.query.filter(Task.user_id == current_user_id).order_by(
        Task.due_date.desc()).all()

    # Set up initial response format:
    response = {
        "Tasks": []
    }

    # Convert tasks to dictionaries,
    # and append each task to the response:
    for task in tasks:
        response["Tasks"].append(task.to_dict())

    return(response)
