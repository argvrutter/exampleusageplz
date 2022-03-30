'''
Columns shared by most/all models
'''
import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
#from api import db
from database import db
from sqlalchemy.orm.attributes import QueryableAttribute
from log import logger, DEBUG

# base class, define common columns and methods
class Base(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return '<%s>' % self.name

    def as_dict(self, show=None, _hide=None, _path=None):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def to_dict(self):
        return self.as_dict()