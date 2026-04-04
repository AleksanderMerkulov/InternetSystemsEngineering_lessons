from marshmallow import fields
from app.extensions import ma


class TimeStatsSchema(ma.Schema):
    title = fields.Str(required=True)
    min = fields.Float(required=True)
    max = fields.Float(required=True)
    avg = fields.Float(required=True)

all_time_stats_schema = TimeStatsSchema(many=True)