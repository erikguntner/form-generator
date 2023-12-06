import pytest
from app import db_session
from models.orm import Application


def test_get_application(app):
    application = Application(name="Admin Application")
    db_session.add(application)
    db_session.commit()

    client = app.test_client()
    response = client.get(f"/api/application/{application.id}")
    data = response.json()

    assert response.status_code == 200
    assert data["name"] == application.name


@pytest.mark.parametrize(("name"), ("Admin Application"))
def test_post_application(client, name):
    response = client.post("/api/application", json={"name": name})
    data = response.json()

    assert response.status_code == 201
    assert data["name"] == name

    application = db_session.query(Application).filter_by(name=name).first()
    assert application is not None
    assert application.name == name
