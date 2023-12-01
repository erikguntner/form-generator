from models.schemas import application_schema
from models.orm import Application
from marshmallow import ValidationError
from app import db_session


def post_application(body):
    try:
        data = application_schema.load(body)
    except ValidationError as err:
        return err.messages, 422

    name = data["name"]

    application = Application(name=name)
    db_session.add(application)
    db_session.commit()
    response = application_schema.dump(Application.query.get(application.id))

    return response, 201
