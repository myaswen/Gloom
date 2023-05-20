# Gloom

## Table of contents
1. [Project Summary](#project-summary)
2. [Technologies Used](#technologies-used)
3. [Screenshots](#screenshots)
4. [Current Features](#current-features)
5. [Local Run Instructions](#local-run-instructions)
6. [Future Features](#future-features)

There's additional technical info about the app in the [wiki](https://github.com/myaswen/Gloom/wiki)!

## Project Summary
Gloom is a full stack, stateful web-app that draws style and function inspiration from [Evernote.com](https://www.evernote.com/). The current build of Gloom offers **notebooks** and **pages** as the two core features of functionality available to users. A more detailed breakdown of these core features and other features can be found in the [Current Features](#current-features) section.

## Technologies Used

This is not an exhaustive list. If you're interested in seeing a more complete list, take a look at the project's `package.json` and `Pipfile`.

### **Frontend**
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

- [React](https://reactjs.org/) is instrumental in the structure of the app's user interface.
- [React Router](https://reactrouter.com/en/main) plays an essential role in the navigation of the app.
- [React Redux](https://react-redux.js.org/) is used to connect React with [Redux](https://redux.js.org/), which is used to manage the state of data in the app.
- [React Quill](https://github.com/zenoamaro/react-quill) is used to connect React with [Quill](https://quilljs.com/), which is an open source WYSIWYG (what you see is what you get) rich-text editor.

### **Backend**
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

- [Flask](https://flask.palletsprojects.com/en/2.2.x/) is the web framework that the backend is built on.
- [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/3.0.x/) is used to connect Flask with [SQLAlchemy](https://www.sqlalchemy.org/), which is used as the app's object relational mapper.
- [Alembic](https://alembic.sqlalchemy.org/en/latest/) is a database migration tool for SQLAlchemy.
- [WTForms](https://wtforms.readthedocs.io/en/3.0.x/) is used for backend form validations.

## Screenshots

![gloom-dashboard](https://i.imgur.com/ofLBkyS.png)
![gloom-page](https://i.imgur.com/4qgMXnI.png)

## Current Features

### Users
* Users can sign up, log in, and log out.
* A demo user is available as an alternative to signing up.
* Users are not able to use any features without logging in.
* Logged in users are directed to their dashboard.
* Logged out users are directed to the authentication page.

### Notebooks
* Users can create notebooks to hold their note-pages.
* Users can view all their notebooks, and select one to view individually.
  * A selected notebook will display a list of all its pages.
* Users can edit the name of their notebooks.
* Users can delete their notebooks.

### Pages
* In a notebook, users can create pages for that notebook.
* Users can view a list of all the pages in a notebook, and select one to view individually.
* Users can edit the title and content of their pages.
* Users can delete their pages.

### Bookmarks
* On the edit view of a page, users can add a bookmark to that page.
* On the edit view of a page, users can remove a bookmark from that page.
* Users can view a list of all their bookmarked pages on the dashboard.

### Scratchpad
* A user has one scratchpad that is always present on their dashboard.
* Users can edit the content of their scratchpad.

### Rich-text Editing
* Users can edit their pages using a WYSIWYG (What You See Is What You Get) rich-text editor.

## Local Run Instructions

1. Clone this repository to a local directory.
2. In the root directory, copy the contents of the `.env.example` to a `.env` file.
    - Assign `DATABASE_URL` to `sqlite:///dev.db`
    - Assign `SECRET_KEY` to anything (but keep it a secret!)
    - `SCHEMA` is only used for live deployments and can be set to anything using snake_case
3. Run the `requirements.txt` file (which will install the backend dependencies):
```
pipenv install -r requirements.txt
```
4. In `./app`, run the Alembic migration:
```
pipenv run flask db upgrade
```
5. Then, seed the database:
```
pipenv run flask seed all
```
6. Start the backend server:
```
pipenv run flask run
```
7. Navigate to `./react-app` and install the frontend dependencies:
```
npm install
```
8. Start the frontend server:
```
npm start
```

## Future Features

### Tags
* Users can create their own custom tags.
* On the edit view of a page, users can add one or more tags to that page.
* On the edit view of a page, users can remove one or more tags from that page.
* Users can view a list of their tags, and select one to view a list of all of the pages with that tag.

### Tasks
* Users can create tasks with custom content and due-dates.
* Users can view their tasks in a list.
* Users can mark a task as complete.
* Users can delete a task.
