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
from unittest import TestCase
from app import create_app
import json


# test all flask api routes
class TestApi(TestCase):
    def setUp(self):
        self.app = create_app().test_client()
        self.app.testing = True

    def test_api_apis_post(self):
        """
        Tests POST: /api/apis - creates a new api
        """
        rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')
        self.assertEqual(rv.status_code, 201)

        rv = self.app.delete('/api/apis/1')
        
    def test_api_apis(self):
        """
        Tests GET: /api/apis - returns all apis
        """
        rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')
        rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(2), name='test2')), content_type='application/json')

        rv = self.app.get('/api/apis')
        self.assertEqual(rv.status_code, 200)

        rv = self.app.delete('/api/apis/1')
        rv = self.app.delete('/api/apis/2')

    def test_api_apis_id(self):
        """
        Tests GET: /api/apis/</id/> - returns a single api
        """
        rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')

        rv = self.app.get('/api/apis/1')
        self.assertEqual(rv.status_code, 200)

        rv = self.app.delete('/api/apis/1')

    def test_api_apis_id_calls(self):
        """
        Tests GET: /api/apis/</id/>/calls - returns all calls for an api
        """
        rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')

        rv = self.app.get('/api/apis/1/calls')
        self.assertEqual(rv.status_code, 200)

        rv = self.app.delete('/api/apis/1')

    def test_api_apis_search_query(self):
        """
        Tests GET: /api/apis/search/<query> - returns all apis that match the query. Can be a list of comma separated values
        """
        rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')

        rv = self.app.get('/api/apis/search/1')
        self.assertEqual(rv.status_code, 200)

        rv = self.app.get('/api/apis/search/test')
        self.assertEqual(rv.status_code, 200)

        rv = self.app.delete('/api/apis/1')

    def test_api_apis_id_calls_search_query(self):
        """
        Tests GET: /api/apis/</id/>/calls/search/<query> - returns all calls that match the query. 
        """
        rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')

        rv = self.app.get('/api/apis/1/calls/search/1')
        self.assertEqual(rv.status_code, 200)

        rv = self.app.delete('/api/apis/1')

    def test_api_apis_id_put(self):
        """
        Tests PUT: /api/apis/</id/> - updates an api
        """
        rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')

        rv = self.app.put('/api/apis/1', data=json.dumps(dict(id = int(1), name='test2')), content_type='application/json')
        self.assertEqual(rv.status_code, 200)

        rv = self.app.delete('/api/apis/1')
        
    def test_api_apis_id_delete(self):
        """
        Tests DELETE: /api/apis/</id/> - deletes an api
        """
        rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')

        rv = self.app.delete('/api/apis/1')
        self.assertEqual(rv.status_code, 200)
    
