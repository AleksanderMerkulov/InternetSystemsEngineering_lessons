from .extensions import db


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


class Artist(db.Model):
    __tablename__ = 'artist'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    # cascade='all, delete-orphan' для полной очистки
    albums = db.relationship('Album', back_populates='artist', cascade='all, delete-orphan')

    def __init__(self, name):
        self.name = name


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

    def __init__(self, name, album_id, mediatype_id, genre_id, composer, milliseconds, bytes, unit_price):
        self.name = name
        self.album_id = album_id
        self.mediatype_id = mediatype_id
        self.genre_id = genre_id
        self.composer = composer
        self.milliseconds = milliseconds
        self.bytes = bytes
        self.unit_price = unit_price


class Genre(db.Model):
    __tablename__ = 'genre'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    # tracks (множественное число) для консистентности
    tracks = db.relationship('Track', back_populates='genre')

    def __init__(self, name):
        self.name = name


class MediaType(db.Model):
    __tablename__ = 'media_type'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    # обратная связь с Track
    tracks = db.relationship('Track', back_populates='mediatype')

    def __init__(self, name):  # ✅ убран id из параметров
        self.name = name