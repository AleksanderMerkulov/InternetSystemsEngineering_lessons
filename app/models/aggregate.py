from app import db
from app.models.country import Country
from app.models.city import City
from app.models.type_building import TypeBuilding
from app.models.building import Building
from sqlalchemy import func, desc

def get_all_buildings():
    query = (db.session.query(
        Building.id,
        Building.title,
        TypeBuilding.name.label("type"),
        Country.name.label("country"),
        City.name.label("city"),
        Building.year,
        Building.height
    )
    .select_from(Building)
    .join(TypeBuilding)
    .join(City)
    .join(Country))

    results = query.all()
    keys = query.statement.columns.keys()

    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results


def get_stats_by_build_type():
    query = (db.session.query(
        TypeBuilding.name.label('title'),
        func.min(Building.height).label('min'),
        func.max(Building.height).label('max'),
        func.round(func.sum(Building.height) / func.count(Building.height), 2).label('avg')
    )
    .select_from(TypeBuilding)
    .join(Building)
    .group_by(TypeBuilding.id, TypeBuilding.name))

    results = query.all()
    keys = query.statement.columns.keys()

    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results


def get_stats_by_country():
    query = (db.session.query(
        Country.name.label('title'),
        func.min(Building.height).label('min'),
        func.max(Building.height).label('max'),
        func.round(func.sum(Building.height) / func.count(Building.height), 2).label('avg')
    )
    .select_from(Country)
    .join(City)
    .join(Building)
    .group_by(Country.id))

    results = query.all()
    keys = query.statement.columns.keys()

    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results


def get_stats_by_year():
    query = (db.session.query(
        Building.year.label('title'),
        func.min(Building.height).label('min'),
        func.max(Building.height).label('max'),
        func.round(func.sum(Building.height) / func.count(Building.height), 2).label('avg')
    )
    .select_from(Building)
    .group_by(Building.year))

    results = query.all()
    keys = query.statement.columns.keys()

    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results