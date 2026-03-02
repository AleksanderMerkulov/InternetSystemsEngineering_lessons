from .extensions import db


class Country(db.Model):
    __tablename__ = 'country'  # задавать необязательно
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column('Страна', db.String(100), nullable=False)
    cities = db.relationship('City', cascade='all, delete')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'\nid: {self.id}, Страна: {self.name}'


class TypeBuilding(db.Model):
    __tablename__ = 'type_building'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column('Тип',db.String(50), nullable=False)
    buildings = db.relationship('Building', back_populates='type_building')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f'\nid: {self.id}, Тип: {self.name}'


class City(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column('Город', db.String(100),)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    country = db.relationship('Country', back_populates='cities', cascade='all, delete')
    buildings = db.relationship('Building', back_populates='city', cascade='all, delete')

    def __init__(self, name, country_id):
        self.name = name
        self.country_id = country_id

    def __repr__(self):
        return f'\nid: {self.id}, Город: {self.name}'


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

