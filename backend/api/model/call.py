'''
A token representing a unique instance of an API call. This call should have one
API/language, and be related to many posts containing usage of this call. This token will be the primary thing
searched against.
'''
from .base import Base

class Call(Base):
    # 