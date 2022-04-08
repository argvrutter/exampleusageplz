from http import HTTPStatus
from flask import Blueprint, abort
from flasgger import swag_from
from api.model.post import Post
#from api.schema.welcome import WelcomeSchema
from flask import Flask,request,redirect, jsonify, abort
post_api = Blueprint('post', __name__)
from database import db
from flask_sqlalchemy import SQLAlchemy


'''
#### routes for post
TODO: All routes require a valid token.

* GET: /api/posts - returns all posts (paginated)
* GET: /api/posts/</id/> - returns a single post
* POST: /api/posts - creates a new post
* PUT: /api/posts/</id/> - updates a post
* DELETE: /api/posts/</id/> - deletes a post

'''
@post_api.route('/posts', methods=['POST'])
def create_post():
    """Create a new post.

    Returns:
        dict: The created post.
    """
    data = request.get_json()
    # TODO: Validate data via swagger schema
    post = Post(**data)
    db.session.add(post)
    db.session.commit()
    return post.to_dict(), 201

@post_api.route('/posts', methods=['GET'])
def get_posts():
    """Get all posts.

    Returns:
        list: A list of all posts.
    """
    posts = Post.query.all()
    # TODO: Validate data via swagger schema
    return jsonify([post.to_dict() for post in posts])

@post_api.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    """Update a post.

    Args:
        post_id (int): The id of the post.

    Returns:
        dict: The updated post.
    """
    # TODO: Validate data via swagger schema
    post = Post.query.get(post_id)
    if not post:
        abort(404)
    data = request.get_json()
    for key, value in data.items():
        setattr(post, key, value)
    db.session.commit()
    return jsonify(post.to_dict())

@post_api.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """Delete a post.

    Args:
        post_id (int): The id of the post.

    Returns:
        dict: The deleted post.
    """
    post = Post.query.get(post_id)
    if not post:
        abort(404)
    db.session.delete(post)
    db.session.commit()
    return jsonify(post.to_dict())

@post_api.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    """Get all posts.

    Returns:
        list: A list of all posts.
    """
    post = Post.query.get(post_id)
    if not post:
        abort(404)
    # TODO: Validate data via swagger schema
    return jsonify(post.to_dict())

'''TODO: search
get calls based on any combination of the following criteria:
API: GET /api/apis/search 
Calls: GET /api/calls/search
'''
@post_api.route('/posts/search', methods=['GET'])
def search_posts(api=None, call=None):
    """Search posts.

    Returns:
        list: A list of all posts meeting the search criteria.
    """
    #Required fields: lang, Call, API
    #Optional: semver, scope
    lang = request.args.get('lang')
    call = request.args.get('call_id')
    api = request.args.get('api')

    # missing a required arg
    if lang is None or call is None or api is None:
        abort(400)

    semver = request.args.get('semver')
    scope = request.args.get('scope')

    #TODO: update to query on api
    posts = Post.query.filter(Post.lang == lang, Post.call_id == call)#, Post.api == api)
    if semver is not None:
        posts = posts.filter(Post.semver == semver)
    if scope is not None:
        posts = posts.filter(Post.scope == scope)
    posts = posts.all()
    
    if posts is None:
        abort(404)
    #posts = posts.all()
    #posts = posts.paginate(page=1, per_page=15, error_out=False)

    if posts is None:
        abort(404)

    #import sys
    #print(posts,file=sys.stderr, flush=True)
    
    #result = dict(posts=[post.to_dict() for post in posts.items], 
    #               total=posts.total, 
    #               current_page=posts.page,
    #               per_page=posts.per_page)
                   
    result = [post.to_dict() for post in posts]
    
    # do simple pagination for now
    result = [result[i:i+5] for i in range(0, len(result), 5)]


    return jsonify(result), 200
