from app.extensions import db
from app.models.artist import *
from app.models.album import *
from app.models.genre import *
from app.models.media_type import *
from app.models.track import *

class Album(db.Model):
    __tablename__ = 'album'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))

    # back_populates='artist' соответствует Artist.albums
    artist = db.relationship('Artist', back_populates='albums')
    # back_populates='album' соответствует Track.album
    tracks = db.relationship('Track', back_populates='album', cascade='all, delete-orphan')

    def __init__(self, title, artist_id):
        self.title = title
        self.artist_id = artist_id

    def __repr__(self):
        return f'\nid: {self.id}, Название: {self.title}'