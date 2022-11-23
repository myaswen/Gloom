from .db import db, environment, SCHEMA, add_prefix_for_prod

page_tags = db.Table(
    "page_tags",
    db.Column("page_id", db.Integer, db.ForeignKey(add_prefix_for_prod("pages.id")), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)
