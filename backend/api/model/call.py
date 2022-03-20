'''
A token representing a unique instance of an API call. This call should have one
API/language, and be related to many posts containing usage of this call. This token will be the primary thing
searched against.
'''
from .base import Base
from ..app import app, db

class Call(Base):
    __tablename__ = 'calls'
    id = db.Column(db.Integer, primary_key=True)
    # name should be unique
    full_name = db.Column(db.String(100), nullable=False)
    api = db.relationship('API', backref=db.backref('posts', lazy=True))