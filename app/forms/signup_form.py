from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def email_exists(form, field):
    # Checking if the email already exists:
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_email(form, field):
    # Check if the submitted string has email elements:
    email = field.data
    if "@" not in email or "." not in email:
        raise ValidationError('Please enter a valid email.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(max=20), username_exists])
    email = StringField('email', validators=[DataRequired(), Length(max=30), valid_email, email_exists])
    password = StringField('password', validators=[DataRequired(), Length(max=30)])
