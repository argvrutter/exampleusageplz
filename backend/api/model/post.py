'''
Contains example usage in the form of code.
'''

from .base import Base, db

class Post(Base):
    content = db.Column(db.Text, nullable=False)