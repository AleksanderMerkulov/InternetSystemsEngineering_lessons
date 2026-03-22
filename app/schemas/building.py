from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app.models.building import Building
from app.extensions import ma, db
from app.schemas.city import CitySchema
from app.schemas.type_building import TypeBuildingSchema


class BuildingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Building
        load_instance = True
        sqla_session = db.session

    city_id = ma.auto_field()
    type_building_id = ma.auto_field()

    type_building = ma.Nested(TypeBuildingSchema())
    city = ma.Nested(CitySchema())

building_schema = BuildingSchema()
buildings_schema = BuildingSchema(many=True)
