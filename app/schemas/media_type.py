from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app.models.media_type import MediaType
from app.extensions import ma, db


class MediaTypeSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = MediaType


media_type_schema = MediaTypeSchema()
media_types_schema = MediaTypeSchema(many=True)
