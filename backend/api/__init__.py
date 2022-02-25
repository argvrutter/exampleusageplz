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
app.config.from_pyfile('config.py')

#register blueprints
app.register_blueprint(home_api, url_prefix='/api')

