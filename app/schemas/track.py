from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app.models.track import Track
from app.extensions import ma, db
from app.schemas.album import AlbumSchema
from app.schemas.media_type import MediaTypeSchema
from app.schemas.genre import GenreSchema


class TrackSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Track
        load_instance = True
        sqla_session = db.session

    album_id = ma.auto_field()
    mediatype_id = ma.auto_field()
    genre_id = ma.auto_field()


    album = ma.Nested(AlbumSchema())
    mediatype = ma.Nested(MediaTypeSchema())
    genre = ma.Nested(GenreSchema())

track_schema = TrackSchema()
tracks_schema = TrackSchema(many=True)
