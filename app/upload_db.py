from . import MediaType
from .models import *
from .extensions import db
import csv


def mediatype_upload():
    with open("app/data/MediaType.csv") as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            new_entry = MediaType(item[1])
            db.session.add(new_entry)
        db.session.commit()


def genre_upload():
    with open("app/data/Genre.csv") as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            new_entry = Genre(item[1])
            db.session.add(new_entry)
        db.session.commit()


def artist_upload():
    with open("app/data/Artist.csv") as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            new_entry = Artist(item[1])
            db.session.add(new_entry)
        db.session.commit()


def album_upload():
    with open("app/data/Album.csv") as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            new_entry = Album(item[1], item[2])
            db.session.add(new_entry)
        db.session.commit()


def track_upload():
    with open("app/data/Track.csv") as f:
        reader = csv.reader(f)
        next(reader)
        for item in reader:
            new_entry = Track(item[1], item[2], item[3], item[4],
                              item[5], item[6], item[7], item[8])
            db.session.add(new_entry)
        db.session.commit()


def init_db():
    """
    Функция-агрегатор, которая пересобирает БД
    :return: None
    """
    db.drop_all()
    db.create_all()
    mediatype_upload()
    genre_upload()
    artist_upload()
    album_upload()
    track_upload()
    print('[ok] Database Init Complete')
