from app.models import db, environment, SCHEMA, User, Page, Notebook, Tag, Task, Scratchpad
from datetime import datetime

def seed_test():
    #--------------------------------------------------
    # User seeds:

    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

    #--------------------------------------------------
    # Notebook seeds:

    notebook1 = Notebook(
        user_id = "1"
    )

    notebook2 = Notebook(
        user_id = "1",
        name = "Demo's notes"
    )

    notebook3 = Notebook(
        user_id = "2",
        name = "Marnie's notes"
    )

    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.commit()

    #--------------------------------------------------
    # Tag seeds:

    tag1 = Tag(
        user_id = "1",
        name = "Tag1"
    )

    tag2 = Tag(
        user_id = "1",
        name = "Tag2"
    )

    tag3 = Tag(
        user_id = "1",
        name = "Tag3"
    )

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.commit()

    #--------------------------------------------------
    # Page seeds:

    page1 = Page(
        user_id = "1",
        notebook_id = "1",
        bookmarked = True,
        title = "Test for notebook 1",
        content = "This is a test with a title and a bookmark."
    )

    page1.tags = [Tag.query.get(1)]

    page2 = Page(
        user_id = "1",
        notebook_id = "2",
        title = "",
        content = "This is a test with no title and no bookmark."
    )

    page2.tags = [Tag.query.get(2), Tag.query.get(3)]

    page3 = Page(
        user_id = "1",
        notebook_id = "2",
        title = "Second page, no bookmark",
        content = "This is a test with a title and no bookmark"
    )

    page4 = Page(
        user_id = "2",
        notebook_id = "3",
        title = "Marnie's first page",
        content = "This is the contents of Marnie's notebook"
    )

    db.session.add(page1)
    db.session.add(page2)
    db.session.add(page3)
    db.session.add(page4)
    db.session.commit()

    #--------------------------------------------------
    # Task seeds:

    task1 = Task(
        user_id = "1",
        content = "Task 1",
        complete = False,
        due_date = datetime.utcnow(),
    )

    task2 = Task(
        user_id = "1",
        content = "Task 2",
        complete = True
    )

    task3 = Task(
        user_id = "2",
        content = "Task 3",
        complete = False,
        due_date = datetime.utcnow(),
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.commit()

    #--------------------------------------------------
    # Scratchpad seeds:

    scratchpad1 = Task(
        user_id = "1",
        content = "Demo's scratchpad1"
    )

    scratchpad2 = Task(
        user_id = "2"
    )

    db.session.add(scratchpad1)
    db.session.add(scratchpad2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_test():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.scratchpads RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pages RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM scratchpads")
        db.session.execute("DELETE FROM tasks")
        db.session.execute("DELETE FROM pages")
        db.session.execute("DELETE FROM tags")
        db.session.execute("DELETE FROM notebooks")
        db.session.execute("DELETE FROM users")

    db.session.commit()
