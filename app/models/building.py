from app.extensions import db
from app.models.country import *
from app.models.city import *
from app.models.type_building import *

class Building(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column('Название', db.String(200))
    type_building_id = db.Column(db.Integer, db.ForeignKey('type_building.id'))
    city_id = db.Column(db.Integer, db.ForeignKey('city.id'))
    year = db.Column(db.Integer)
    height = db.Column(db.Integer)
    type_building = db.relationship("TypeBuilding", back_populates="buildings")
    city = db.relationship("City", back_populates="buildings")

    def __init__(self, title, type_building_id, city_id, year, height):
        self.title = title
        self.type_building_id = type_building_id
        self.city_id = city_id
        self.year = year
        self.height = height

    def __repr__(self):
        return f'\nid: {self.id}, Название: {self.title}, Город: {self.city_id}, тип строения: {self.type_building_id}, год: {self.year}'

