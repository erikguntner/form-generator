from connexion import FlaskApp


def create_app(test_config=None):
    app = FlaskApp(__name__, specification_dir="openapi")
    app.add_api("openapi.yaml")

    application = app.app

    import models.orm as orm

    db_session = orm.init_db("sqlite:///db.sqlite")

    if test_config:
        application.config.update(test_config)

    @application.teardown_appcontext
    def shutdown_session(exception=None):
        db_session.remove()

    return {"app": app, "db_session": db_session}
