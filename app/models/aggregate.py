from app import db
from app.extensions import db
from app.models.artist import *
from app.models.album import *
from app.models.genre import *
from app.models.media_type import *
from sqlalchemy import func, desc

from app.models.track import Track


def get_formatted_results(keys, results):
    formatted_results = [
        {field_name: value for field_name, value in zip(keys, result)}
        for result in results
    ]
    return formatted_results

def get_time_info():
    query = (
        db.session.query(
            Genre.name.label("title"),
            func.min(Track.milliseconds).label("min"),
            func.max(Track.milliseconds).label("max"),
            func.avg(Track.milliseconds).label("avg"),
        )
        .select_from(Track)
        .join(Genre)
        .group_by(Genre.id)
        .order_by(Genre.id)
    )

    results = query.all()
    keys = query.statement.columns.keys()

    formatted_results = get_formatted_results(keys, results)
    return formatted_results

def get_time_info_by_artist():
    query = (
        db.session.query(
            Artist.name.label("title"),
            func.min(Track.milliseconds).label("min"),
            func.max(Track.milliseconds).label("max"),
            func.avg(Track.milliseconds).label("avg"),
        )
        .select_from(Track)
        .join(Album)
        .join(Artist)
        .group_by(Artist.id)
        .order_by(Artist.id)
    )

    results = query.all()
    keys = query.statement.columns.keys()

    formatted_results = get_formatted_results(keys, results)
    return formatted_results


def get_time_info_by_album():
    query = (
        db.session.query(
            func.concat(Album.title, '(',Artist.name, ')' ).label("title"),
            func.min(Track.milliseconds).label("min"),
            func.max(Track.milliseconds).label("max"),
            func.avg(Track.milliseconds).label("avg"),
        )
        .select_from(Track)
        .join(Album)
        .join(Artist)
        .group_by(Album.id)
        .order_by(Album.title)
    )

    results = query.all()
    keys = query.statement.columns.keys()

    formatted_results = get_formatted_results(keys, results)
    return formatted_results