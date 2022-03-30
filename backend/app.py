'''
Initialize flask app
'''
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger
# import colored logger
from logging import INFO
from log import logger

def create_app():
    from database import db
    # import blueprints
    # from api.route.home import home_api
    from api.route.post import post_api
    from api.route.api import api_api
    from api.route.call import call_api

    logger.log(INFO, "Initializing app")
    app = Flask(__name__)

    app.config['SWAGGER'] = {
        'title': 'completed app',
    }
    Swagger(app)

    ## Initialize Config
    app.config.from_pyfile('config.py')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    @app.before_first_request
    def create_table():
        db.create_all()

    #register blueprints
    # app.register_blueprint(home_api, name='home api', url_prefix='/api')
    logger.log(INFO, 'registering blueprints')
    
    app.register_blueprint(post_api, name='create post', url_prefix='/api')
    app.register_blueprint(api_api, name='apis', url_prefix='/api')
    app.register_blueprint(call_api, name='call', url_prefix='/api')

    return app



if __name__ == '__main__':
    from argparse import ArgumentParser
    #from api import app
    app = create_app()
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port
    host = '0.0.0.0'

    logger.log(INFO, f"Listening on port {port} and host {host}")
    app.run(host=host, port=port, debug=True)

    