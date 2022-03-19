from flask_marshmallow import Schema
from marshmallow.fields import Str
from flask import Flask
from flask_marshmallow import Marshmallow
from database import db

class PostSchema(Schema):
    class Meta:
        # Fields to expose
        fields = ["content"]

    content = Str()