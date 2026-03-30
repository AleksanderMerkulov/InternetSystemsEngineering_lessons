from app.extensions import db
from app.models.artist import *
from app.models.album import *
from app.models.genre import *
from app.models.media_type import *

class Track(db.Model):
    __tablename__ = 'track'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'))
    mediatype_id = db.Column(db.Integer, db.ForeignKey('media_type.id'))
    genre_id = db.Column(db.Integer, db.ForeignKey('genre.id'))
    composer = db.Column(db.String(100), nullable=False)
    milliseconds = db.Column(db.Integer)
    bytes = db.Column(db.Integer)
    unit_price = db.Column(db.Numeric(10, 2))

    # back_populates='tracks'
    genre = db.relationship('Genre', back_populates='tracks')
    # back_populates='tracks' соответствует Album.tracks
    album = db.relationship('Album', back_populates='tracks')
    # back_populates='tracks' соответствует MediaType.tracks
    mediatype = db.relationship('MediaType', back_populates='tracks')
