from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app.models.album import Album
from app.extensions import ma, db
from app.schemas.artist import ArtistSchema


class AlbumSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Album
    artist = ma.Nested(ArtistSchema())


album_schema = AlbumSchema()
albums_schema = AlbumSchema(many=True)
