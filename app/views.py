from flask import Blueprint, render_template
from sqlalchemy import func

from app.models import *
from .extensions import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    title = 'Главная страница'
    building = (
        db.session.query(
            TypeBuilding.id,
            TypeBuilding.name.label('Название'),
        )
        .select_from(TypeBuilding)
    )
    print(type_building_entries)
    return render_template('index.html',
                           title=title)
                           # type_building_head=type_building_entries.statement.columns.keys(),
                           # type_building_entries=type_building_entries.all())


@main.route('/type-building-stats')
def type_building_stats():
    title = 'Типы зданий. Статистика'
    type_buildings = (
        db.session.query(
            TypeBuilding.name.label('Название'),
            func.min(Building.height).label('Минимальная'),
            func.max(Building.height).label('Максимальная'),
            func.round(func.sum(Building.height) / func.count(Building.height), 2).label('Средняя')
        )
        .select_from(TypeBuilding)
        .join(Building)
        .group_by(TypeBuilding.id, TypeBuilding.name)

    )
    return render_template('page_with_table.html',
                           title=title,
                           entries_head=type_buildings.statement.columns.keys(),
                           entries=type_buildings.all())

@main.route('/type-building')
def type_building():
    title = 'Типы зданий'
    type_buildings = (
        db.session.query(
            TypeBuilding.id,
            TypeBuilding.name.label('Название'),
        )
        .select_from(TypeBuilding)
    )
    return render_template('page_with_table.html',
                           title=title,
                           entries_head=type_buildings.statement.columns.keys(),
                           entries=type_buildings.all())


@main.route('/countries')
def counties():
    title = 'Страны'
    countries = (
        db.session.query(
            Country.id,
            Country.name.label('Название'),
            func.group_concat(City.name, ", ").label("Города"),
        )
        .select_from(Country)
        .join(City)
        .group_by(Country.id)
        # .order_by(Country.name)
    )
    return render_template('page_with_table.html',
                           title=title,
                           entries_head=countries.statement.columns.keys(),
                           entries=countries.all())


@main.route('/cities')
def cities():
    title = 'Города'
    cities = (
        db.session.query(
            City.id,
            City.name.label('Город'),
            Country.name.label('Страна'),
            func.group_concat(Building.title, ", ").label("Строения"),
        )
        .select_from(City)
        .join(Country, City.country_id == Country.id)
        .join(Building, Building.id == City.id)
        .group_by(City.id)
        # .order_by(City.name, Country.name)
    )
    return render_template('page_with_table.html',
                           title=title,
                           entries_head=cities.statement.columns.keys(),
                           entries=cities.all())


@main.route('/buildings')
def buildings():
    title = 'Строения'
    buildings = (
        db.session.query(
            Building.id,
            Building.title.label('Название'),
            TypeBuilding.name.label('Тип'),
            Country.name.label('Страна'),
            City.name.label('Город'),
        )
        .select_from(Building)
        .join(City, Building.city_id == City.id)
        .join(TypeBuilding, Building.type_building_id == TypeBuilding.id)
        .join(Country, City.country_id == Country.id)
        .group_by(Building.id)
        # .order_by(City.name, Country.name)
    )
    print(buildings)
    return render_template('page_with_table.html',
                           title=title,
                           entries_head=buildings.statement.columns.keys(),
                           entries=buildings.all())
