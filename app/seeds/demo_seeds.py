from app.models import db, environment, SCHEMA, User, Page, Notebook, Tag, Task, Scratchpad
from datetime import datetime

def demo_seeds():
    #--------------------------------------------------
    # User seeds:

    demo = User(
        username='Demo', email='demo@aa.io', password='password')

    db.session.add(demo)
    db.session.commit()


    #--------------------------------------------------
    # Notebook seeds:

    notebook1 = Notebook(
        user_id = "1",
        name = "Intro to JavaScript"
    )

    db.session.add(notebook1)
    db.session.commit()


    #--------------------------------------------------
    # Page seeds:

    page1 = Page(
        user_id = "1",
        notebook_id = "1",
        bookmarked = True,
        title = "While Loops",
        content = '''<p>One of the simplest loops in JavaScript is the <span style="background-color: rgb(68, 68, 68);">while</span> loop. As with all loops, the <span style="background-color: rgb(68, 68, 68);">while</span> loop will execute a block of code as long as a specified condition is true. The while loop starts with the keyword <span style="background-color: rgb(68, 68, 68);">while</span> then states a condition in parentheses.</p><p><br></p><p>In the following example, the code in the loop will run, over and over again, as long as a variable (<span style="background-color: rgb(68, 68, 68);">index</span>) is less than 10:</p><p><br></p><p><span class="ql-font-monospace" style="color: rgb(102, 163, 224);">let</span><span class="ql-font-monospace"> index = </span><span class="ql-font-monospace" style="color: rgb(194, 133, 255);">0</span><span class="ql-font-monospace">;</span></p><p><span class="ql-font-monospace" style="color: rgb(136, 136, 136);">// this is the condition that will be checked every time this loop is run:</span></p><p><span class="ql-font-monospace" style="color: rgb(102, 163, 224);">while</span><span class="ql-font-monospace"> (index &lt; </span><span class="ql-font-monospace" style="color: rgb(194, 133, 255);">10</span><span class="ql-font-monospace">) {</span></p><p><span class="ql-font-monospace" style="color: rgb(102, 185, 102);">console</span><span class="ql-font-monospace">.</span><span class="ql-font-monospace" style="color: rgb(102, 185, 102);">log</span><span class="ql-font-monospace">(</span><span class="ql-font-monospace" style="color: rgb(178, 178, 0);">"The number is "</span><span class="ql-font-monospace"> + index);</span></p><p><span class="ql-font-monospace" style="color: rgb(136, 136, 136);"> // this is common shorthand for "index = index + 1":</span></p><p><span class="ql-font-monospace">index++;</span></p><p><span class="ql-font-monospace">}</span></p><p><br></p><p>The most important thing to remember when writing any loop is to always be working towards your condition. In the example above if we did not increment the <span style="background-color: rgb(68, 68, 68);">index</span> variable by 1 each time the loop ran then we would be stuck with what we call an infinite loop.</p>'''
    )

    db.session.add(page1)
    db.session.commit()


    #--------------------------------------------------
    # Scratchpad seeds:

    scratchpad1 = Scratchpad(
        user_id = "1",
        content = "Demo's scratchpad"
    )

    db.session.add(scratchpad1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_demo_seeds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.scratchpads RESTART IDENTITY CASCADE;")
        # db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.pages RESTART IDENTITY CASCADE;")
        # db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM scratchpads")
        # db.session.execute("DELETE FROM tasks")
        db.session.execute("DELETE FROM pages")
        # db.session.execute("DELETE FROM tags")
        db.session.execute("DELETE FROM notebooks")
        db.session.execute("DELETE FROM users")

    db.session.commit()
