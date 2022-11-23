from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    dashboard_image = db.Column(db.String(255), nullable=True)

    # A user can have many pages, a page belongs to a user:
    pages = db.relationship("Page", back_populates="user", cascade="all, delete-orphan")

    # A user can have many notebooks, a notebook belongs to a user:
    notebooks = db.relationship("Notebook", back_populates="user", cascade="all, delete-orphan")

    # A user can have many tags, a tag belongs to a user:
    tags = db.relationship("Tag", back_populates="user", cascade="all, delete-orphan")

    # A user can have many tasks, a task belongs to a user:
    tasks = db.relationship("Task", back_populates="user", cascade="all, delete-orphan")

    # A user can have one scratchpad, a scratchpad belongs to a user:
    scratchpad = db.relationship("Scratchpad", uselist=False, back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "dashboardImage": self.dashboard_image
        }
