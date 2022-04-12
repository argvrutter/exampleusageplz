from unittest import TestCase
from app import create_app
import json

'''
Methods:
* GET: /api/apis - returns all apis
* GET: /api/apis/</id/> - returns a single api
* GET: /api/apis/</id/>/calls - returns all calls for an api
* GET: /api/apis/search/<query> - returns all apis that match the query. Can be a list of comma separated values
* GET: /api/apis/</id/>/calls/search/<query> - returns all calls that match the query. 
* POST: /api/apis - creates a new api
* PUT: /api/apis/</id/> - updates an api
* DELETE: /api/apis/</id/> - deletes an api
'''


class TestApi(TestCase):

    def setUp(self):
        self.app = create_app()#.test_client()
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        # set app db to use sqlite in memory
        self.app = self.app.test_client()
        self.app.testing = True

    def test_api_apis_post(self):
        """
        Tests POST: /api/apis - creates a new api
        """
        data = dict(id = int(1), name='test1', lang='js', semantic_version='1.0.0')

        rv = self.app.post('/api/apis', data=json.dumps(data), content_type='application/json')
        self.assertEqual(rv.status_code, 201)

        # make sure the api was created
        result = json.loads(rv.data)
        self.assertEqual(result['id'], data['id'])
        self.assertEqual(result['name'], data['name'])
        self.assertEqual(result['lang'], data['lang'])
        self.assertEqual(result['semantic_version'], data['semantic_version'])


        rv = self.app.delete('/api/apis/1')
        
    def test_api_apis(self):
        """
        Tests GET: /api/apis - returns all apis
        """
        data1 = dict(id = int(1), name='test1', lang='js', semantic_version='1.0.0')
        data2 = dict(id = int(2), name='test2', lang='js', semantic_version='1.0.0')

        rv = self.app.post('/api/apis', data=json.dumps(data1), content_type='application/json')
        rv = self.app.post('/api/apis', data=json.dumps(data2), content_type='application/json')

        rv = self.app.get('/api/apis')
        self.assertEqual(rv.status_code, 200)

        # make all the apis were returned
        result = json.loads(rv.data)
        self.assertEqual(result[0]['id'], data1['id'])
        self.assertEqual(result[0]['name'], data1['name'])
        self.assertEqual(result[0]['lang'], data1['lang'])
        self.assertEqual(result[0]['semantic_version'], data1['semantic_version'])

        self.assertEqual(result[1]['id'], data2['id'])
        self.assertEqual(result[1]['name'], data2['name'])
        self.assertEqual(result[1]['lang'], data2['lang'])
        self.assertEqual(result[1]['semantic_version'], data2['semantic_version'])


        rv = self.app.delete('/api/apis/1')
        rv = self.app.delete('/api/apis/2')

    def test_api_apis_id(self):
        """
        Tests GET: /api/apis/</id/> - returns a single api
        """
        data = dict(id = int(1), name='test', lang='js', semantic_version='1.0.0')

        rv = self.app.post('/api/apis', data=json.dumps(data), content_type='application/json')

        rv = self.app.get('/api/apis/1')
        self.assertEqual(rv.status_code, 200)

        # make sure the correct api was returned
        result = json.loads(rv.data)
        self.assertEqual(result['id'], data['id'])
        self.assertEqual(result['name'], data['name'])

        rv = self.app.delete('/api/apis/1')

    # TODO: write assert tests to test equality on calls
    def test_api_apis_id_calls(self):
        """
        Tests GET: /api/apis/</id/>/calls - returns all calls for an api
        """
        pass
        #rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')

        #rv = self.app.get('/api/apis/1/calls')
        #self.assertEqual(rv.status_code, 200)

        #rv = self.app.delete('/api/apis/1')

    def test_api_apis_search_query(self):
        """
        Tests GET: /api/apis/search/<query> - returns all apis that match the query. Can be a list of comma separated values
        """
        data = dict(id = int(1), name='test1', lang='js', semantic_version='1.0.0')

        rv = self.app.post('/api/apis', data=json.dumps(data), content_type='application/json')

        # search using name
        rv = self.app.get('/api/apis/search/test1')
        self.assertEqual(rv.status_code, 200)

        # make sure the correct api was returned
        result = json.loads(rv.data)
        self.assertTrue(result)
        self.assertEqual(result[0]['id'], data['id'])
        self.assertEqual(result[0]['name'], data['name'])
        self.assertEqual(result[0]['lang'], data['lang'])
        self.assertEqual(result[0]['semantic_version'], data['semantic_version'])


        rv = self.app.delete('/api/apis/1')

    # TODO: write assert tests to test equality on calls
    def test_api_apis_id_calls_search_query(self):
        """
        Tests GET: /api/apis/</id/>/calls/search/<query> - returns all calls that match the query. 
        """
        pass
        #rv = self.app.post('/api/apis', data=json.dumps(dict(id = int(1), name='test')), content_type='application/json')

        #rv = self.app.get('/api/apis/1/calls/search/1')
        #self.assertEqual(rv.status_code, 200)

        #rv = self.app.delete('/api/apis/1')

    def test_api_apis_id_put(self):
        """
        Tests PUT: /api/apis/</id/> - updates an api
        """
        data = dict(id = int(1), name='test1', lang='js', semantic_version='1.0.0')
        rv = self.app.post('/api/apis', data=json.dumps(data), content_type='application/json')

        #updated data
        data = dict(id = int(1), name='test1updated', lang='js2', semantic_version='1.0.2')

        rv = self.app.put('/api/apis/1', data=json.dumps(data), content_type='application/json')
        self.assertEqual(rv.status_code, 200)

        # make sure the api was updated
        result = json.loads(rv.data)

        self.assertEqual(result['id'], data['id'])
        self.assertEqual(result['name'], data['name'])
        self.assertEqual(result['lang'], data['lang'])
        self.assertEqual(result['semantic_version'], data['semantic_version'])

        rv = self.app.delete('/api/apis/1')
        
    def test_api_apis_id_delete(self):
        """
        Tests DELETE: /api/apis/</id/> - deletes an api
        """

        data = dict(id = int(1), name='test1', lang='js', semantic_version='1.0.0')

        rv = self.app.post('/api/apis', data=json.dumps(data), content_type='application/json')

        rv = self.app.delete('/api/apis/1')
        self.assertEqual(rv.status_code, 200)

        # make sure it was deleted by searching it 
        rv = self.app.get('/api/apis/1')
        self.assertEqual(rv.status_code, 404)