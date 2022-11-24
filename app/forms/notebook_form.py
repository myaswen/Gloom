from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length


class NotebookForm(FlaskForm):
    name = StringField("Name", validators=[Length(max=50)])
