from http import HTTPStatus
from flask import Blueprint, abort
from api.model.api import API
from api.model.call import Call
#from api.schema.welcome import WelcomeSchema
from flask import Flask,request,redirect, jsonify, abort

api_api = Blueprint('api', __name__)
from database import db

'''routes for api
* GET: /api/apis - returns all apis
* GET: /api/apis/</id/> - returns a single api
* GET: /api/apis/</id/>/calls - returns all calls for an api
* GET: /api/apis/search/<query> - returns all apis that match the query. Can be a list of comma separated values
* GET: /api/apis/</id/>/calls/search/<query> - returns all calls that match the query. 
* POST: /api/apis - creates a new api
* PUT: /api/apis/</id/> - updates an api
* DELETE: /api/apis/</id/> - deletes an api
'''
# Create
@api_api.route('/api/apis', methods=['POST'])
def create_api():
    """Create a new api.
    Returns:
        dict: The created api.
    """
    # TODO: Validate data via swagger schema
    # TODO: support creating multiple apis at once
    data = request.get_json()
    api = API(**data) # TODO: add validation
    db.session.add(api)
    db.session.commit()
    return api.to_dict(), 201

@api_api.route('/api/apis', methods=['GET'])
def get_apis():
    """Get all apis.
    Returns:
        list: A list of all apis.
    """
    apis = API.query.all()
    return jsonify([api.to_dict() for api in apis])

# Read
@api_api.route('/api/apis/<int:api_id>', methods=['GET'])
def get_api(api_id):
    """Get a single api.
    Args:
        api_id (int): The id of the api.
    Returns:
        dict: The api.
    """
    api = API.query.get(api_id)
    if not api:
        abort(404)
    return api.to_dict()

# get calls
@api_api.route('/api/apis/<int:api_id>/calls', methods=['GET'])
def get_api_callees(api_id):
    """Get all calls for an api.
    Args:
        api_id (int): The id of the api.
    Returns:
        list: A list of all calls.
    """
    api = API.query.get(api_id)
    if not api:
        abort(404)
    callees = api.callees
    return jsonify([callee.to_dict() for callee in callees])

# string search
@api_api.route('/api/apis/search/<query>', methods=['GET'])
def get_api_search(query):
    """Get all apis that match the query. Can be a list of comma separated values.
    Args:
        query (str): The query.
    Returns:
        list: A list of all apis.
    """
    apis = API.query.filter(API.name.like('%'+query+'%')).all()
    return jsonify([api.to_dict() for api in apis])

# return all calls that match the query.
@api_api.route('/api/apis/<int:api_id>/calls/search/<query>', methods=['GET'])
def get_api_callees_search(api_id, query):
    """Get all calls that match the query.
    Args:
        api_id (int): The id of the api.
        query (str): The query.
    Returns:
        list: A list of all calls.
    """
    api = API.query.get(api_id)
    if not api:
        abort(404)
    callees = api.callees.filter(Call.name.like('%'+query+'%')).all()
    return jsonify([callee.to_dict() for callee in callees])

# update
@api_api.route('/api/apis/<int:api_id>', methods=['PUT'])
def update_api(api_id):
    """Update an api.
    Args:
        api_id (int): The id of the api.
    Returns:
        dict: The updated api.
    """
    api = API.query.get(api_id)
    if not api:
        abort(404)
    data = request.get_json()
    for key, value in data.items():
        setattr(api, key, value)
    db.session.commit()
    return api.to_dict()

# delete
@api_api.route('/api/apis/<int:api_id>', methods=['DELETE'])
def delete_api(api_id):
    """Delete an api.
    Args:
        api_id (int): The id of the api.
    Returns:
        dict: The deleted api.
    """
    api = API.query.get(api_id)
    if not api:
        abort(404)
    db.session.delete(api)
    db.session.commit()
    return api.to_dict()