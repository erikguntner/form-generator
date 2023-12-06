import pytest
from init import create_app


@pytest.fixture()
def app():
    app = create_app(
        test_config={
            "TESTING": True,
            "DATABASE_URI": "sqlite:///db.sqlite_test",
        }
    )

    yield app["app"]


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
