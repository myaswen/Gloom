from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Task(db.Model):
    __tablename__ = "tasks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    content = db.Column(db.Text, default="", nullable=False)
    complete = db.Column(db.Boolean, default=False, nullable=False)
    due_date = db.Column(db.DateTime(), nullable=True)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow(), nullable=False)

    # A task belongs to a user, a user can have many tasks:
    user = db.relationship("User", back_populates="tasks")

    # Method to convert instance data to JSON:
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "content": self.content,
            "complete": self.complete,
            "dueDate": self.due_date,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
