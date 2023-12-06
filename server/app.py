from pathlib import Path
from init import create_app

app = create_app()

# print sql alchemy uri
print(app.app.config["SQLALCHEMY_DATABASE_URI"])

if __name__ == "__main__":
    app.run(f"{Path(__file__).stem}:app", port=8080, reload=True)
