'''
Initialize flask app
'''
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger

def create_app():
    from database import db
    # import blueprints
    # from api.route.home import home_api
    from api.route.post import post_api
    app = Flask(__name__)

    app.config['SWAGGER'] = {
        'title': 'completed app',
    }
    swagger = Swagger(app)

    ## Initialize Config
    app.config.from_pyfile('config.py')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # add test models to db
    from api.model.api import API
    from api.model.post import Post
    from api.model.call import Call
    
    api = API(name='test_api')
    post = Post(content='test_post')
    call = Call(full_name='test_call')

    db.create_all()
    
    @app.before_first_request
    def create_table():
        db.create_all()

    #register blueprints
    # app.register_blueprint(home_api, name='home api', url_prefix='/api')
    app.register_blueprint(post_api, name='create post', url_prefix='/api')
    return app



if __name__ == '__main__':
    from argparse import ArgumentParser
    #from api import app
    app = create_app()
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port, debug=True)
    