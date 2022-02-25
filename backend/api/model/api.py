'''
Module, API,library, framework, etc. that provides a set of functions and classes that can be used to build software.
One to many relationship with calls. Collection.
'''
from .collection import Collection
from api import db
import datetime

class API(Collection):
    __tablename__ = 'apis'

    callees = db.relationship('calls', backref='api', lazy='dynamic')

    def __init__(self, name, description):
        super().__init__(name, description)

    def __repr__(self):
        return '<API %r>' % self.name
    __tablename__ = 'apis'
