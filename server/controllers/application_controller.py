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


def get_application(application_id):
    application = Application.query.get(application_id)
    if application is None:
        return "Not found", 404

    response = application_schema.dump(application)

    return response, 200


def get_applications():
    applications = Application.query.all()
    response = application_schema.dump(applications, many=True)

    return response, 200
