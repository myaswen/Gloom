from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField
from wtforms.validators import DataRequired, Length


class EditPageForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=50)])
    content = TextAreaField("Content", validators=[Length(max=250000)])
    bookmarked = BooleanField("Bookmarked")
