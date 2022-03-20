'''
Module, API,library, framework, etc. that provides a set of functions and classes that can be used to build software.
One to many relationship with calls. Collection.
'''
<<<<<<< Updated upstream:backend/api/model/api.py
from .collection import Collection
from database import db
=======
from api import db
>>>>>>> Stashed changes:backend/api/api.py
import datetime
from base import Base

class API(Base):
    __tablename__ = 'apis'

    callees = db.relationship('calls', backref='api', lazy='dynamic')

    def __repr__(self):
        return '<API %r>' % self.name
    __tablename__ = 'apis'
