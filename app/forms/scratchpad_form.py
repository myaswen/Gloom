from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import Length


class ScratchpadForm(FlaskForm):
    content = TextAreaField("Content", validators=[Length(max=10000)])
