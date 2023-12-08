import os
import click
from connexion import FlaskApp
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


def create_app(test_config=None):
    app = FlaskApp(__name__, specification_dir="openapi")
    app.add_api("openapi.yaml")

    application = app.app

    # some deploy systems set the database url in the environ
    db_url = os.environ.get("DATABASE_URL")

    if db_url is None:
        # default to a sqlite database in the instance folder
        db_url = "sqlite:///db.sqlite"

    application.config.from_mapping(
        # default secret that should be overridden in environ or config
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev"),
        SQLALCHEMY_DATABASE_URI=db_url,
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        application.config.from_pyfile("config.py", silent=True)
    else:
        # load the test config if passed in
        application.config.update(test_config)

    # import models.orm as orm

    # initialize Flask-SQLAlchemy and the init-db command
    db.init_app(application)
    application.cli.add_command(init_db_command)

    return app


def init_db():
    db.drop_all()
    db.create_all()


@click.command("init-db")
@with_appcontext
def init_db_command():
    """Clear existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")
