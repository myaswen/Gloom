from .db import db, environment, SCHEMA, add_prefix_for_prod
from .page_tag import page_tags

class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(20), nullable=False, unique=True)

    # A tag belongs to a user, a user can have many tags:
    user = db.relationship("User", back_populates="tags")

    # A tag can have many pages, a page can have many tags:
    pages = db.relationship("Page", secondary=page_tags, back_populates="tags")

    # Method to convert instance data to JSON:
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "name": self.name
        }
