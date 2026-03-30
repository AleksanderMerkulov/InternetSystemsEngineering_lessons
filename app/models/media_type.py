from app.extensions import db
from app.models.artist import *
from app.models.album import *
from app.models.genre import *
from app.models.track import *

class MediaType(db.Model):
    __tablename__ = 'media_type'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    # обратная связь с Track
    tracks = db.relationship('Track', back_populates='mediatype')

    def __init__(self, name):
        self.name = name