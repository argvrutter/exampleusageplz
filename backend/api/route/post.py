from http import HTTPStatus
from flask import Blueprint, abort
from flasgger import swag_from
from api.model.post import PostModel
#from api.schema.welcome import WelcomeSchema
from flask import Flask,render_template,request,redirect
post_api = Blueprint('api', __name__)
from database import db


# Create Post Method
@post_api.route('/post/create', methods = ['GET','POST'])
@swag_from({
    'responses': {
        HTTPStatus.OK.value: {
            'description': 'Welcome to the Flask Starter Kit',
        }
    }
})
def create_post():
    print(request, flush=True)
    print(request.args)#.get('format')
    if request.method == 'GET':
        return 'create_post GET request', 200
 
    if request.method == 'POST':
        content = str(request.args.get('content'))
        print(content)
        c = PostModel.query.filter_by(content=content).first()
        if not c:
            post = PostModel(content=content)
            db.session.add(post)
            db.session.commit()
            return 'create_post: successfully added ' + str(content) + ' to the database', 200 #redirect('/api')
        return 'create_post: ' + str(content) + 'already exsists in database'


# Retrieve Post Method
@post_api.route('/post/retrieve/<string:content>', methods = ['GET','POST'])
@swag_from({
    'responses': {
        HTTPStatus.OK.value: {
            'description': 'Welcome to the Flask Starter Kit',
        }
    }
})
# TODO: Update to return schema
def retrieve_post(content):
    print(request, flush=True)
    print(request.args)#.get('format')
    c = PostModel.query.filter_by(content=content).first()
    if c:
        return "retrieve_post: content exists in database"
    return "retrieve_post: content doesn't exist in database"
    # add schema here


# Delete Post Method
@post_api.route('/post/delete', methods = ['GET','POST'])
@swag_from({
    'responses': {
        HTTPStatus.OK.value: {
            'description': 'Welcome to the Flask Starter Kit',
        }
    }
})
def delete_post():
    print(request, flush=True)
    print(request.args)#.get('format')
    content = str(request.args.get('content'))
    print(content)
    c = PostModel.query.filter_by(content=content).first()
    if c:
        db.session.delete(c)
        db.session.commit()
        return 'delete_post: successfully deleted ' + str(content) + ' from the database', 200
    abort(404)
