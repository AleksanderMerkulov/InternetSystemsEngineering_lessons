from app.extensions import db
from app.models.artist import *
from app.models.album import *
from app.models.media_type import *
from app.models.track import *

class Genre(db.Model):
    __tablename__ = 'genre'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    # tracks (множественное число) для консистентности
    tracks = db.relationship('Track', back_populates='genre')

    def __init__(self, name):
        self.name = name
