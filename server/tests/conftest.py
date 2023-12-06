import pytest
from init import create_app, init_db


@pytest.fixture()
def app():
    app = create_app(
        test_config={
            "TESTING": True,
            "DATABASE_URI": "sqlite:///db.sqlite_test",
        }
    )

    with app.app.app_context():
        init_db()

    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
