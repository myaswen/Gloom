from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, DateTimeField
from wtforms.validators import DataRequired, Length


class TaskForm(FlaskForm):
    content = TextAreaField("Content", validators=[DataRequired(), Length(max=1000)])
    dueDate = DateTimeField("Due Date")
    complete = BooleanField("Complete")
