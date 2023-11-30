from connexion import FlaskApp
from connexion.options import SwaggerUIOptions
from pathlib import Path


app = FlaskApp(__name__)
app.add_api('openapi.yaml')

if __name__ == "__main__":
    app.run(f"{Path(__file__).stem}:app", port=8080)