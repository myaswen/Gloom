from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Notebook(db.Model):
    __tablename__ = "notebooks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(50), default="Unnamed Notebook", nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow(), nullable=False)

    # A notebook belongs to a user, a user can have many notebooks:
    user = db.relationship("User", back_populates="notebooks")

    # Method to convert instance data to JSON:
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "name": self.name,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
