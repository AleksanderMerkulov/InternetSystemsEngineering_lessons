from app.extensions import db
from app.models.album import *
from app.models.genre import *
from app.models.media_type import *
from app.models.track import *

class Artist(db.Model):
    __tablename__ = 'artist'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    # cascade='all, delete-orphan' для полной очистки
    albums = db.relationship('Album', back_populates='artist', cascade='all, delete-orphan')

    def __init__(self, name):
        self.name = name
