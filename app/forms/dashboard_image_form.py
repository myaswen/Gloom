from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length


class DashboardImageForm(FlaskForm):
    dashboardImage = StringField("Dashboard Image", validators=[Length(max=255)])
