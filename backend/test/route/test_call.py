from unittest import TestCase
from app import create_app
import json

'''
Methods:
* GET: 'api/calls' - returns all calls
* GET: /api/calls/<call_id> - returns a single call
* POST: /api/calls/<call_id> - creates a new call
* DELETE: /api/calls/<call_id> - deletes a call
* PUT: /api/calls/<call_id> - updates a call
* GET /api/calls/search - returns all calls that match the query.

Call Model:
id = db.Column(db.Integer, primary_key=True)
# name should be unique
full_name = db.Column(db.String(100), nullable=False)
api_id = db.Column(db.Integer, db.ForeignKey('apis.id'), nullable=False)
'''


class TestCall(TestCase):

    def setUp(self):
        self.app = create_app().test_client()
        self.app.testing = True

    def test_call_get(self):
        """
        Tests GET: /api/calls - returns all calls
        """

        data1 = dict(id = int(1), api_id=int(1), full_name='test')
        data2 = dict(id = int(2), api_id=int(2), full_name='test2')

        rv = self.app.post('/api/calls', data=json.dumps(data1), content_type='application/json')
        rv = self.app.post('/api/calls', data=json.dumps(data2), content_type='application/json')

        rv = self.app.get('/api/calls')
        self.assertEqual(rv.status_code, 200)   
        
        # make sure it returned the right data
        result = json.loads(rv.data)
        self.assertEqual(result[0]['id'], data1['id'])
        self.assertEqual(result[0]['api_id'], data1['api_id'])
        self.assertEqual(result[0]['full_name'], data1['full_name'])

        self.assertEqual(result[1]['id'], data2['id'])
        self.assertEqual(result[1]['api_id'], data2['api_id'])
        self.assertEqual(result[1]['full_name'], data2['full_name'])

        rv = self.app.delete('/api/calls/1')
        rv = self.app.delete('/api/calls/2')

    def test_call_get_call_id(self):
        """
        Tests GET: /api/call/<call_id> - returns a single call
        """
        data = dict(id = int(1), api_id=int(1), full_name='test')

        rv = self.app.post('/api/calls', data=json.dumps(data), content_type='application/json')
        rv = self.app.get('/api/calls/1')
        self.assertEqual(rv.status_code, 200)

        # make sure it returned the right data
        result = json.loads(rv.data)
        self.assertEqual(result['id'], data['id'])
        self.assertEqual(result['api_id'], data['api_id'])
        self.assertEqual(result['full_name'], data['full_name'])

        rv = self.app.delete('/api/calls/1')

    def test_call_post(self):
        """
        Tests POST: /api/calls - creates a new call
        """

        data = dict(id = int(1), api_id=int(1), full_name='test')
        rv = self.app.post('/api/calls', data=json.dumps(data), content_type='application/json')
        self.assertEqual(rv.status_code, 201)

        # make sure it was created by searching it
        rv = self.app.get('/api/calls/1')
        self.assertEqual(rv.status_code, 200)
        result = json.loads(rv.data)

        self.assertEqual(result['id'], data['id'])
        self.assertEqual(result['api_id'], data['api_id'])
        self.assertEqual(result['full_name'], data['full_name'])

        rv = self.app.delete('/api/calls/1')

    def test_call_delete(self):
        """
        Tests DELETE: /api/calls/<call_id> - deletes a call
        """
        rv = self.app.post('/api/calls', data=json.dumps(dict(id = int(1), api_id=int(1), full_name='test')), content_type='application/json')
        
        rv = self.app.delete('/api/calls/1')
        self.assertEqual(rv.status_code, 200)

        # make sure it's deleted by searching it
        rv = self.app.get('/api/calls/search', query_string=dict(name = 'test'), content_type='application/json')
        self.assertEqual(rv.status_code, 200)

        result = json.loads(rv.data)

        # should be false since we deleted it
        self.assertFalse(result)

    def test_call_put(self):
        """
        Tests PUT: /api/calls/<call_id> - updates a call
        """
        rv = self.app.post('/api/calls', data=json.dumps(dict(id = int(1), api_id=int(1), full_name='test')), content_type='application/json')

        # data to update with
        data = dict(id = int(1), api_id=int(1), full_name='test2')

        rv = self.app.put('/api/calls/1', data=json.dumps(data), content_type='application/json')
        self.assertEqual(rv.status_code, 200)

        # make sure it was updated
        rv = self.app.get('/api/calls/1')
        self.assertEqual(rv.status_code, 200)
        result = json.loads(rv.data)

        self.assertEqual(result['id'], data['id'])
        self.assertEqual(result['api_id'], data['api_id'])
        self.assertEqual(result['full_name'], data['full_name'])

        rv = self.app.delete('/api/calls/1')

    def test_call_search(self):
        """
        Tests GET /api/calls/search - returns all calls that match the query.
        """

        data = dict(id = int(1), api_id=int(1), full_name='test')
        rv = self.app.post('/api/calls', data=json.dumps(data), content_type='application/json')

        rv = self.app.get('/api/calls/search', query_string=dict(name = 'test'), content_type='application/json')
        self.assertEqual(rv.status_code, 200)
        
        # make sure it returned the right result
        result = json.loads(rv.data)
        
        self.assertEqual(result[0]['id'], data['id'])
        self.assertEqual(result[0]['api_id'], data['api_id'])
        self.assertEqual(result[0]['full_name'], data['full_name'])

        rv = self.app.delete('/api/calls/1')

    def test_call_search_query_not_found(self):
        """
        Tests GET /api/calls/search/ on a query that does not exist.
        """
        rv = self.app.post('/api/calls', data=json.dumps(dict(id = int(1), api_id=int(1), full_name='test')), content_type='application/json')

        rv = self.app.get('/api/calls/search', query_string=dict(name = 'notfound'), content_type='application/json')
        self.assertEqual(rv.status_code, 200)

        result = json.loads(rv.data)

        # make sure it returned an empty list
        self.assertFalse(result)

        rv = self.app.delete('/api/calls/1')