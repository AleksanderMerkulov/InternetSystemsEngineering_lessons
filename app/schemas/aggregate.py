from marshmallow import fields
from app.extensions import ma


class AllBuildingsSchema(ma.Schema):
    id = fields.Int(required=True)
    title = fields.Str(required=True)
    type = fields.Str(required=True)
    country = fields.Str(required=True)
    city = fields.Str(required=True)
    year = fields.Int(required=True)
    height = fields.Float(required=True)


all_buildings_schema = AllBuildingsSchema(many=True)


class StatsSchema(ma.Schema):
    title = fields.Str(required=True)
    min = fields.Float(required=True)
    max = fields.Float(required=True)
    avg = fields.Float(required=True)


all_stats_schema = StatsSchema(many=True)
