from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app.models.artist import Artist
from app.extensions import ma, db


class ArtistSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Artist


artist_schema = ArtistSchema()
artists_schema = ArtistSchema(many=True)
