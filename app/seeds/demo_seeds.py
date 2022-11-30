from app.models import db, environment, SCHEMA, User, Page, Notebook, Tag, Task, Scratchpad
from datetime import datetime

def demo_seeds():
    #--------------------------------------------------
    # User seeds:

    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.commit()

    #--------------------------------------------------
    # Notebook seeds:

    notebook1 = Notebook(
        user_id = "1",
        name = "Intro to JavaScript"
    )

    db.session.add(notebook1)
    db.session.commit()
