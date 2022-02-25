'''
Collection of references 
'''
import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from api import db

class Collection(db.Model):
    __tablename__ = 'collections'

    # api_references = db.relationship('APIReference', backref='collection', lazy='dynamic')

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return '<Collection %r>' % self.name