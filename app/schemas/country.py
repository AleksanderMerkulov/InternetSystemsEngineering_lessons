from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app.models.country import Country
from app.extensions import ma, db


class CountrySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Country
        ad_instance = True
        sqla_session = db.session


country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)

