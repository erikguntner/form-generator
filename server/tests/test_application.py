import pytest
from init import db
from models.orm import Application


def test_get_application(client, app):
    with app.app.app_context():
        application = Application(name="Admin Application")
        db.session.add(application)
        db.session.commit()
        db.session.refresh(application)
        # get the application from the database

    response = client.get(f"/api/application/{application.id}")
    data = response.json()

    assert response.status_code == 200
    assert data["name"] == application.name


@pytest.mark.parametrize(("name"), ("Admin Application"))
def test_post_application(client, app, name):
    response = client.post("/api/application", json={"name": name})
    data = response.json()

    assert response.status_code == 201
    assert data["name"] == name

    with app.app.app_context():
        application = db.session.get(Application, data["id"])
        assert application is not None
        assert application.name == name
