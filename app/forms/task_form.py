from flask_wtf import FlaskForm
from wtforms import TextAreaField, BooleanField, DateTimeField
from wtforms.validators import Length


class TaskForm(FlaskForm):
    content = TextAreaField("Content", validators=[Length(max=1000)])
    dueDate = DateTimeField("Due Date")
    complete = BooleanField("Complete")
