from connexion import FlaskApp
from pathlib import Path

import models.orm as orm

db_session = None

db_session = orm.init_db("sqlite:///db.sqlite")
app = FlaskApp(__name__)
app.add_api("openapi.yaml")

application = app.app


@application.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == "__main__":
    app.run(f"{Path(__file__).stem}:app", port=8080, reload=True)
