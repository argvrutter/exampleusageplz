'''
A token representing a unique instance of an API call. This call should have one
API/language, and be related to many posts containing usage of this call. This token will be the primary thing
searched against.
'''
from .base import Base
from database import db

class Call(Base):
    __tablename__ = 'calls'
    id = db.Column(db.Integer, primary_key=True)
    # name should be unique
    full_name = db.Column(db.String(100), nullable=False)
    api_id = db.Column(db.Integer, db.ForeignKey('apis.id'), nullable=False)
    
    #link to the many to one relationship from api
    api = db.relationship("API", back_populates="callees")

    # create many to one relationship with posts
    posts = db.relationship("Post", back_populates="call")

    def __repr__(self):
        return '<Call %r>' % self.full_name
