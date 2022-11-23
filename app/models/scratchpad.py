from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Scratchpad(db.Model):
    __tablename__ = "scratchpads"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    content = db.Column(db.Text(250000), default="", nullable=False)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow(), nullable=False)

    # A scratchpad belongs to a user, a user can have one scratchpad:
    user = db.relationship("User", back_populates="scratchpad")

    # Method to convert instance data to JSON:
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "content": self.content,
            "updatedAt": self.updated_at
        }
