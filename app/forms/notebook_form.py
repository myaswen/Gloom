from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class NotebookForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(max=50)])
