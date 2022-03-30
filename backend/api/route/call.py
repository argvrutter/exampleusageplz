from flask import Blueprint, abort
from api.model.call import Call
#from api.schema.welcome import WelcomeSchema
from flask import Flask,request,redirect, jsonify, abort

call_api = Blueprint('call', __name__)
from database import db

'''
class Call(Base):
    __tablename__ = 'calls'
    id = db.Column(db.Integer, primary_key=True)
    # name should be unique
    full_name = db.Column(db.String(100), nullable=False)
    api = db.relationship('API', backref=db.backref('posts', lazy=True))
'''

'''
#### routes for call
* GET: /api/call/<call_id>
* POST: /api/call/<call_id>
* DELETE: /api/call/<call_id>
'''
# Create
@call_api.route('/calls', methods=['POST'])
def create_call():
    """Create a call.
    Returns:
        dict: The created call.
    """
    data = request.get_json()
    call = Call(**data)
    db.session.add(call)
    db.session.commit()
    return call.to_dict(), 201

# Read
@call_api.route('/calls', methods=['GET'])
def get_calls():
    """Get all calls.
    Returns:
        list: A list of all calls.
    """
    calls = Call.query.all()
    return jsonify([call.to_dict() for call in calls])

# read one call
@call_api.route('/calls/<int:call_id>', methods=['GET'])
def get_call(call_id):
    """Get a single call.
    Args:
        call_id (int): The id of the call.
    Returns:
        dict: The call.
    """
    call = Call.query.get(call_id)
    if not call:
        abort(404)
    return call.to_dict()

# Update
@call_api.route('/calls/<int:call_id>', methods=['PUT'])
def update_call(call_id):
    """Update a call.
    Args:
        call_id (int): The id of the call.
    Returns:
        dict: The updated call.
    """
    call = Call.query.get(call_id)
    if not call:
        abort(404)
    data = request.get_json()
    for key, value in data.items():
        setattr(call, key, value)
    db.session.commit()
    return call.to_dict()

# Delete
@call_api.route('/calls/<int:call_id>', methods=['DELETE'])
def delete_call(call_id):
    """Delete a call.
    Args:
        call_id (int): The id of the call.
    Returns:
        dict: The deleted call.
    """
    call = Call.query.get(call_id)
    if not call:
        abort(404)
    db.session.delete(call)
    db.session.commit()
    return call.to_dict()

# search call by name
# TODO: test cases for search
@call_api.route('/calls/search', methods=['GET'])
def search_call():
    """Search call by name.
    Returns:
        list: A list of all calls.
    """
    name = request.args.get('name')
    calls = Call.query.filter(Call.full_name.like('%'+name+'%')).all()
    return jsonify([call.to_dict() for call in calls])