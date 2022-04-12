'''
Module, API,library, framework, etc. that provides a set of functions and classes that can be used to build software.
One to many relationship with calls. Collection.
'''
from database import db
import datetime
from .base import Base

class API(Base):
    __tablename__ = 'apis'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    lang = db.Column(db.String(10), nullable=False)
    semantic_version = db.Column(db.String(10))

    # many to one relationship with calls
    callees = db.relationship('Call',  lazy=True, back_populates='api')

    def __repr__(self):
        return '<API %r>' % self.name
    __tablename__ = 'apis'

