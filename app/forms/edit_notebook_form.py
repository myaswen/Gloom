from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length, DataRequired


class EditNotebookForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(max=50)])
