from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Page(db.Model):
    __tablename__ = "pages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id")), nullable=False)
    bookmarked = db.Column(db.Boolean, default=False, nullable=False)
    title = db.Column(db.String(50), default="Untitled", nullable=False)
    content = db.Column(db.Text(250000), default="", nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow(), nullable=False)
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow(), nullable=False)

    # A page belongs to a notebook, a notebook can have many pages:
    notebook = db.relationship("Notebook", back_populates="pages")

    # Method to convert instance data to JSON:
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "notebookId": self.notebook_id,
            "bookmarked": self.bookmarked,
            "title": self.title,
            "content": self.content,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
