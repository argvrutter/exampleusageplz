# db should be in a seperate file and imported in app.py and other files. This will help avoid circular imports in blueprints 
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
