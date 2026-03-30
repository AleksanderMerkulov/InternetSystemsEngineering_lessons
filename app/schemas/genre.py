from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app.models.genre import Genre
from app.extensions import ma, db


class GenreSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Genre


genre_schema = GenreSchema()
genres_schema = GenreSchema(many=True)
