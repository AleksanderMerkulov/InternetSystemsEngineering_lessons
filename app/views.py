from flask import Blueprint, render_template, request
from sqlalchemy import func, text, select

from .models import *
from .extensions import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    title = 'Главная страница'
    # type_building_entries = (
    #     db.session.query(
    #         TypeBuilding.id,
    #         TypeBuilding.name.label('Название'),
    #     )
    #     .select_from(TypeBuilding)
    # )
    # print(type_building_entries)
    return render_template('index.html',
                           title=title)
                           # type_building_head=type_building_entries.statement.columns.keys(),
                           # type_building_entries=type_building_entries.all())


@main.route('/track', methods=('GET', 'POST'))
def track():
    title = 'Треки. Фильтр по названию, испольнителю, типу'
    # tracks = (
    #     db.session.query(
    #         TypeBuilding.name.label('Название'),
    #         func.min(Building.height).label('Минимальная'),
    #         func.max(Building.height).label('Максимальная'),
    #         func.round(func.sum(Building.height) / func.count(Building.height), 2).label('Средняя')
    #     )
    #     .select_from(TypeBuilding)
    #     .join(Building)
    #     .group_by(TypeBuilding.id, TypeBuilding.name)
    #
    # )

    selected_mediatype = request.form.get('mediatype')

    tracks = (
        db.session.query(
            Track.name.label("Название трека"),
            MediaType.name.label('Тип медиа'),
            Album.title.label('Альбом'),
            Artist.name.label('Артист'),
            Genre.name.label('Жанр')
        )
        .select_from(Track)
        .join(MediaType, Track.mediatype_id == MediaType.id)
        .join(Album, Track.album_id == Album.id)
        .join(Genre, Track.genre_id == Genre.id)
        .join(Artist, Album.artist_id == Artist.id)
        .order_by(Album.title)
    )
    entries_heads = tracks.statement.columns.keys()

    if selected_mediatype:
        tracks = tracks.filter(MediaType.id == selected_mediatype)
    else:
        tracks = tracks.all()

    mediatype = (
        db.session.query(
            MediaType.name,
            MediaType.id
        )
        .select_from(MediaType)
    ).all()



    return render_template('pages/track_with_filter.html',
                           title=title,
                           entries_head=entries_heads,
                           entries=tracks,
                           mediatypes=mediatype,
                           selected_mediatype=selected_mediatype)


@main.route('/track_query_2')
def track_query_2():
    title = 'Цена трека в разных валютах'

    track_entries = (
        db.session.query(
            Track.name.label("Название трека"),
            Track.unit_price.label('Цена в долларах'),
            func.round(Track.unit_price * 70.71, 2).label('Цена в рублях')
        )
        .select_from(Track)
        .order_by('Цена в рублях')
    )
    track_head = track_entries.statement.columns.keys()

    return render_template('page_with_table.html',
                           title=title,
                           entries_head=track_head,
                           entries=track_entries.all(),
                           query=track_entries
                           )


@main.route('/artist_query_3')
def artist_query_3():
    title = 'Артисты и треки'
    subtitle = 'запрос на группировку данных и вычисление агрегатных функций;'

    artist_entries = (
        db.session.query(
            Artist.name.label('Артист'),
            func.group_concat(Album.title, ', ').label('Альбомы'),
            func.group_concat(Track.name, ', ').label('Треки'),
            func.count(Track.id).label('Кол-во треков'),
        )
        .select_from(Artist)
        .join(Album, Album.artist_id == Artist.id)
        .join(Track, Track.album_id == Album.id)
        .group_by(Artist.id)
        .order_by(Artist.name)
    )

    return render_template('page_with_table.html',
                           title=title,
                           subtitle=subtitle,
                           entries_head=artist_entries.statement.columns.keys(),
                           entries=artist_entries.all(),
                           query=artist_entries
                           )

@main.route('/artist_query_4')
def artist_query_4():
    title = 'Артисты и треки. Жанр: рок'
    subtitle = 'запрос на группировку данных с фильтрацией по исходным записям таблицы и по сгруппированным значениям;'

    artist_entries = (
        db.session.query(
            Artist.name.label('Артист'),
            func.group_concat(Album.title, ', ').label('Альбомы'),
            func.group_concat(
                func.concat(Track.name, ' (', Genre.name, ')'),
                ', '
            ).label('Треки'),
            func.count(Track.id).label('Кол-во треков'),
        )
        .select_from(Artist)
        .join(Album, Album.artist_id == Artist.id)
        .join(Track, Track.album_id == Album.id)
        .join(Genre, Track.genre_id == Genre.id)
        .filter(Genre.name == 'Rock')
        .group_by(Artist.id)
        .having(func.count(Track.id) > 5)  # условие для уже сгруппированных данных
        .order_by('Кол-во треков')
    )

    return render_template('page_with_table.html',
                           title=title,
                           subtitle=subtitle,
                           entries_head=artist_entries.statement.columns.keys(),
                           entries=artist_entries.all(),
                           query=artist_entries
                           )


@main.route('/artist_query_5')
def artist_query_5():
    title = 'Артисты и треки. Вложенный вопрос'
    subtitle = 'запрос'

    genre_filter = Genre.name == 'Rock'  # вынос условия в переменную

    """
    СTE - запрос - общие табличные выражения
    Именованный набор данных, который существует только в рамках одного SQL запроса
    Позволяет разбивать сложный запрос на логические части, чтобы повысить читаемость
    """
    tracks_with_genres_cte = (
        db.session.query(
            Track.id.label('track_id'),
            Track.name.label('track_name'),
            Track.album_id,
            Genre.name.label('genre_name'),
            Artist.id.label('artist_id'),
            Artist.name.label('artist_name'),
            func.concat(Track.name, ' (', Genre.name, ')').label('track_with_genre')
        )
        .select_from(Track)
        .join(Album, Track.album_id == Album.id)
        .join(Artist, Album.artist_id == Artist.id)
        .join(Genre, Track.genre_id == Genre.id)
        .filter(genre_filter)  # Фильтрация на уровне треков
        .cte('tracks_with_genres')
    )

    print(tracks_with_genres_cte)

    artist_entries = (
        db.session.query(
            tracks_with_genres_cte.c.artist_name.label('Артист'),
            func.group_concat(tracks_with_genres_cte.c.track_with_genre, ', ').label('Треки'),
            func.count(tracks_with_genres_cte.c.track_id).label('Кол-во треков')
        )
        .group_by(tracks_with_genres_cte.c.artist_id)
        .having(func.count(tracks_with_genres_cte.c.track_id) > 5)
        .order_by(func.count(tracks_with_genres_cte.c.track_id))
    )

    return render_template('page_with_table.html',
                           title=title,
                           subtitle=subtitle,
                           entries_head=artist_entries.statement.columns.keys(),
                           entries=artist_entries.all(),
                           query=artist_entries
                           )

# @main.route('/type-building-stats')
# def type_building_stats():
#     title = 'Типы зданий. Статистика'
#     type_buildings = (
#         db.session.query(
#             TypeBuilding.name.label('Название'),
#             func.min(Building.height).label('Минимальная'),
#             func.max(Building.height).label('Максимальная'),
#             func.round(func.sum(Building.height) / func.count(Building.height), 2).label('Средняя')
#         )
#         .select_from(TypeBuilding)
#         .join(Building)
#         .group_by(TypeBuilding.id, TypeBuilding.name)
#
#     )
#     return render_template('page_with_table.html',
#                            title=title,
#                            entries_head=type_buildings.statement.columns.keys(),
#                            entries=type_buildings.all())

# @main.route('/type-building')
# def type_building():
#     title = 'Типы зданий'
#     type_buildings = (
#         db.session.query(
#             TypeBuilding.id,
#             TypeBuilding.name.label('Название'),
#         )
#         .select_from(TypeBuilding)
#     )
#     return render_template('page_with_table.html',
#                            title=title,
#                            entries_head=type_buildings.statement.columns.keys(),
#                            entries=type_buildings.all())
#
#
# @main.route('/countries')
# def counties():
#     title = 'Страны'
#     countries = (
#         db.session.query(
#             Country.id,
#             Country.name.label('Название'),
#             func.group_concat(City.name, ", ").label("Города"),
#         )
#         .select_from(Country)
#         .join(City)
#         .group_by(Country.id)
#         # .order_by(Country.name)
#     )
#     return render_template('page_with_table.html',
#                            title=title,
#                            entries_head=countries.statement.columns.keys(),
#                            entries=countries.all())
#
#
# @main.route('/cities')
# def cities():
#     title = 'Города'
#     cities = (
#         db.session.query(
#             City.id,
#             City.name.label('Город'),
#             Country.name.label('Страна'),
#             func.group_concat(Building.title, ", ").label("Строения"),
#         )
#         .select_from(City)
#         .join(Country, City.country_id == Country.id)
#         .join(Building, Building.id == City.id)
#         .group_by(City.id)
#         # .order_by(City.name, Country.name)
#     )
#     return render_template('page_with_table.html',
#                            title=title,
#                            entries_head=cities.statement.columns.keys(),
#                            entries=cities.all())
#
#
# @main.route('/buildings')
# def buildings():
#     title = 'Строения'
#     buildings = (
#         db.session.query(
#             Building.id,
#             Building.title.label('Название'),
#             TypeBuilding.name.label('Тип'),
#             Country.name.label('Страна'),
#             City.name.label('Город'),
#         )
#         .select_from(Building)
#         .join(City, Building.city_id == City.id)
#         .join(TypeBuilding, Building.type_building_id == TypeBuilding.id)
#         .join(Country, City.country_id == Country.id)
#         .group_by(Building.id)
#         # .order_by(City.name, Country.name)
#     )
#     print(buildings)
#     return render_template('page_with_table.html',
#                            title=title,
#                            entries_head=buildings.statement.columns.keys(),
#                            entries=buildings.all())
