'''
Contains example usage in the form of code.
'''

from .base import Base #, db
from database import db

# TODO: update this to Base model and get base model working with database
#class Post(Base):
class PostModel(db.Model):
    __tablename__ = "Posts table"
    id = db.Column(db.String(), primary_key=True)
    content = db.Column(db.String(), nullable=False)

    def __init__(self, content):
        self.id = content
        self.content = content
