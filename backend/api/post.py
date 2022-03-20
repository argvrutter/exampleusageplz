'''
Contains example usage in the form of code. Has a required relationship with one user, one call, and one API.
Optional fields include: API version string, scope. TODO: a list of tags.
Required 
'''

from .base import Base
from flask import Flask, request, jsonify, abort
from ..app import app, db

class Post(Base):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    
    # TODO: require authentication
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # user = db.relationship('User', backref=db.backref('posts', lazy=True))

    call_id = db.Column(db.Integer, db.ForeignKey('calls.id'), nullable=False)
    call = db.relationship('Call', backref=db.backref('posts', lazy=True))

    api_id = db.Column(db.Integer, db.ForeignKey('apis.id'), nullable=False)
    api = db.relationship('API', backref=db.backref('posts', lazy=True))

    # required language spec, should this be index lookup?
    lang = db.Column(db.String(10), nullable=False)

    # Optional fields include: API version string, scope, and a list of tags.
    semantic_version = db.Column(db.String(10))
    scope = db.Column(db.String(100))
    # TODO: tags (could encompass semantic version?)
    # TODO: link to repository?

    def __init__(self, title, content, call, api, lang, semantic_version=None, scope=None):
        self.title = title
        self.content = content
        # self.user = user
        self.call = call
        self.api = api
        self.lang = lang
        self.semantic_version = semantic_version
        self.scope = scope

    # serialize
    def as_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            # 'user': self.user.as_dict(),
            'call': self.call.as_dict(),
            'api': self.api.as_dict(),
            'lang': self.lang,
            'semantic_version': self.semantic_version,
            'scope': self.scope
        }

    def __repr__(self):
        return '<Post %r>' % self.title

'''
#### routes for post
TODO: All routes require a valid token.

* GET: /api/posts - returns all posts (paginated)
* GET: /api/posts/</id/> - returns a single post
* POST: /api/posts - creates a new post
* PUT: /api/posts/</id/> - updates a post
* DELETE: /api/posts/</id/> - deletes a post

'''
@app.route('/posts', methods=['POST'])
def create_post():
    """Create a new post.

    Returns:
        dict: The created post.
    """
    data = request.get_json()
    return create_post(data)

@app.route('/posts', methods=['GET'])
def get_posts():
    """Get all posts.

    Returns:
        list: A list of all posts.
    """
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts])

@app.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    """Update a post.

    Args:
        post_id (int): The id of the post.

    Returns:
        dict: The updated post.
    """
    post = Post.query.get(post_id)
    if not post:
        abort(404)
    data = request.get_json()
    for key, value in data.items():
        setattr(post, key, value)
    db.session.commit()
    return jsonify(post.to_dict())

@app.route('/posts/<int:post_id>', methods=['DELETE'])
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
