from app.extensions import db
from app.models.country import *
from app.models.building import *
from app.models.city import *

class TypeBuilding(db.Model):
    __tablename__ = 'type_building'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column('Тип',db.String(50), nullable=False)
    buildings = db.relationship('Building', back_populates='type_building')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'\nid: {self.id}, Тип: {self.name}'


