'''
Initialize flask app
'''
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger

# import blueprints
from api.route.home import home_api

app = Flask(__name__)

app.config['SWAGGER'] = {
    'title': 'completed app',
}
swagger = Swagger(app)

## Initialize Config
app.config.from_pyfile('../config.py')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#register blueprints
app.register_blueprint(home_api, url_prefix='/api')

db = SQLAlchemy()
db.init_app(app)
 
@app.before_first_request
def create_table():
    db.create_all()

