from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length


class PageForm(FlaskForm):
    title = StringField("Name", validators=[DataRequired(), Length(max=50)])
    content = TextAreaField("Name", validators=[Length(max=250000)])
