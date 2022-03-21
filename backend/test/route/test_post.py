from unittest import TestCase
from app import create_app


class TestWelcome(TestCase):
    def setUp(self):
        self.app = create_app().test_client()

    def test_welcome(self):
        """
        Tests creation of a post
        """
        # create a sample post
        data = {
            'title': 'Test Post',
            'content': 'This is a test post',
            # 'user_id': 1,
            'api_id': 1, #TODO: use UUID?
            'call_id': 1,
            'created_at': '2018-01-01T00:00:00Z',
            'updated_at': '2018-01-01T00:00:00Z',
            'lang': 'js',
            # optional
            'semantic_version': '1.0.0',
            'scope': None
        }
        rv = self.app.post('/api/post/create', data=data)

        # If we recalculate the hash on the block we should get the same result as we have stored
        self.assertEqual(data, rv.get_json())
