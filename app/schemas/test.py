from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field

from app.models.Test import Test, TestItem
from app.extensions import ma, db

class TestItemSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = TestItem
        load_instance = True

class TestSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Test
        load_instance = True
        exclude = ("test_type",)

    type = auto_field("test_type")
    tasks = ma.Nested(TestItemSchema, many=True, attribute='items')

test_schema = TestSchema()
tests_schema = TestSchema(many=True)
