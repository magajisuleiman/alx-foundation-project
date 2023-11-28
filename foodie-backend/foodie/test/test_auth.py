import json
from unittest import TestCase, mock
from datetime import datetime, timedelta
from random import randint
from flask import Flask
from werkzeug.security import generate_password_hash
from foodie.models.user import User
from foodie.auth.auth import auth_bp

class TestRegister(TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(auth_bp)

    def tearDown(self):
        pass

    def test_register_complete_data(self):
        with self.app.test_client() as client:
            data = {
                'email': 'test@example.com',
                'password': 'password',
                'first_name': 'John',
                'last_name': 'Doe'
            }
            response = client.post('/register', json=data)
            response_data = json.loads(response.data)
            self.assertEqual(response.status_code, 201)
            self.assertEqual(response_data['message'], 'User registered. OTP sent to email for verification.')
            self.assertIn('userData', response_data)

    def test_register_incomplete_data(self):
        with self.app.test_client() as client:
            data = {
                'email': 'test@example.com',
                'password': 'password',
                'first_name': 'John'
            }
            response = client.post('/register', json=data)
            response_data = json.loads(response.data)
            self.assertEqual(response.status_code, 400)
            self.assertEqual(response_data['message'], 'Incomplete registration data')

    def test_register_invalid_email(self):
        with self.app.test_client() as client:
            data = {
                'email': 'test',
                'password': 'password',
                'first_name': 'John',
                'last_name': 'Doe'
            }
            response = client.post('/register', json=data)
            response_data = json.loads(response.data)
            self.assertEqual(response.status_code, 400)
            self.assertEqual(response_data['message'], 'Invalid email')

    def test_register_existing_email(self):
        with self.app.test_client() as client:
            data = {
                'email': 'existing@example.com',
                'password': 'password',
                'first_name': 'John',
                'last_name': 'Doe'
            }
            # Mocking the User.query.filter_by method to return an existing user
            with mock.patch('app.User.query.filter_by') as mock_query:
                mock_query.return_value.first.return_value = User(email='existing@example.com')
                response = client.post('/register', json=data)
                response_data = json.loads(response.data)
                self.assertEqual(response.status_code, 400)
                self.assertEqual(response_data['message'], 'Email already exists')

    @mock.patch('app.send_otp_email')
    @mock.patch('app.create_access_token')
    @mock.patch('app.create_refresh_token')
    def test_register_successful(self, mock_refresh_token, mock_access_token, mock_send_email):
        with self.app.test_client() as client:
            data = {
                'email': 'test@example.com',
                'password': 'password',
                'first_name': 'John',
                'last_name': 'Doe'
            }
            # Mocking the User.query.filter_by method to return None, indicating no existing user
            with mock.patch('app.User.query.filter_by') as mock_query:
                mock_query.return_value.first.return_value = None
                # Mocking the User.insert method
                with mock.patch('app.User.insert') as mock_insert:
                    # Mocking the randint function to always return 1234
                    with mock.patch('app.randint') as mock_randint:
                        mock_randint.return_value = 1234
                        # Mocking the datetime.now function to return a fixed datetime
                        with mock.patch('app.datetime') as mock_datetime:
                            mock_datetime.now.return_value = datetime(2022, 1, 1)
                            response = client.post('/register', json=data)
                            response_data = json.loads(response.data)