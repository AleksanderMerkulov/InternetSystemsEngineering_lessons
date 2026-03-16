from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask_httpauth import HTTPBasicAuth

db = SQLAlchemy()

auth = HTTPBasicAuth()


# @auth.get_password
# def get_password(username):
#     if username == 'student':
#         return 'dvfu'
#     return None

@auth.verify_password
def verify_password(username, password):
    if username == 'student' and password == 'dvfu':
        return True
    return False

@auth.error_handler
def unauthorized():
    return jsonify({'error': 'Unauthorized access'}), 401
