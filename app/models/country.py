from app.extensions import db
from app.models.building import *
from app.models.city import *
from app.models.type_building import *

class Country(db.Model):
    __tablename__ = 'country'  # задавать необязательно
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column('Страна', db.String(100), nullable=False)
    cities = db.relationship('City', cascade='all, delete')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'\nid: {self.id}, Страна: {self.name}'