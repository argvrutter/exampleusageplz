from http import HTTPStatus
from flask import Blueprint, abort
from flasgger import swag_from
from api.model.post import Post
#from api.schema.welcome import WelcomeSchema
from flask import Flask,request,redirect, jsonify, abort
post_api = Blueprint('api', __name__)
from database import db


# Create Post Method
# @post_api.route('/post/create', methods = ['GET','POST'])
# @swag_from({
#     'responses': {
#         HTTPStatus.OK.value: {
#             'description': 'Welcome to the Flask Starter Kit',
#         }
#     }
# })
# def create_post():
#     print(request, flush=True)
#     print(request.args)#.get('format')
#     if request.method == 'GET':
#         return 'create_post GET request', 200
 
#     if request.method == 'POST':
#         content = str(request.args.get('content'))
#         print(content)
#         c = PostModel.query.filter_by(content=content).first()
#         if not c:
#             post = PostModel(content=content)
#             db.session.add(post)
#             db.session.commit()
#             return 'create_post: successfully added ' + str(content) + ' to the database', 200 #redirect('/api')
#         return 'create_post: ' + str(content) + 'already exsists in database'

# # Delete Post Method
# @post_api.route('/post/delete', methods = ['GET','POST'])
# @swag_from({
#     'responses': {
#         HTTPStatus.OK.value: {
#             'description': 'Welcome to the Flask Starter Kit',
#         }
#     }
# })
# def delete_post():
#     print(request, flush=True)
#     print(request.args)#.get('format')
#     content = str(request.args.get('content'))
#     print(content)
#     c = PostModel.query.filter_by(content=content).first()
#     if c:
#         db.session.delete(c)
#         db.session.commit()
#         return 'delete_post: successfully deleted ' + str(content) + ' from the database', 200
#     abort(404)


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