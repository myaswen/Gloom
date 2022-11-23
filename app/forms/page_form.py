from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length


class PageForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=50)])
    content = TextAreaField("Content", validators=[Length(max=250000)])
