from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from werkzeug.exceptions import NotFound

from app.models.album import Album
from app.models.genre import Genre
from app.models.media_type import MediaType
from app.models.track import Track
from app.extensions import db, auth
from app.schemas.track import tracks_schema, track_schema, tracks_no_detail_schema

track_bp = Blueprint('track', __name__)

""" 
==================
реализация CRUD
==================
"""
@track_bp.route('/', methods=['GET'])
def get_tracks():
    tracks = Track.query.all()
    return jsonify({
        "success": True,
        # "tracks": tracks_schema.dump(tracks)
        "tracks": tracks_no_detail_schema.dump(tracks)
    }), 200

@track_bp.route('/', methods=['POST'])
@auth.login_required()
def set_track():
    try:
        data = request.get_json()
        building = track_schema.load(data, session=db.session)

        print('[ok]')
        db.session.add(building)
        db.session.commit()
        return jsonify({
            "success": True,
            "tracks": track_schema.dump(building),
        }), 200
    except ValidationError as err:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": err.messages
        }, 400)
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": str(e)
        }, 500)


@track_bp.route('/<int:id>/', methods=['PUT'])
@auth.login_required()
def put_building(id):
    try:
        data = request.get_json()
        track = db.get_or_404(Track, id)
        updated_track = track_schema.load(data,
                                          session=db.session,
                                          instance=track,
                                          partial=True)
        db.session.add(updated_track)
        db.session.commit()
        return jsonify({
            "success": True,
            "tracks": track_schema.dump(updated_track),
        }), 200
    except NotFound as err:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": str(err)
        }), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": str(e)
        }), 500


@track_bp.route('/<int:id>/', methods=['DELETE'])
@auth.login_required()
def delete_building(id):
    try:
        track = db.get_or_404(Track, id)

        track_data = track_schema.dump(track)

        db.session.delete(track)
        db.session.commit()
        return jsonify({
            "success": True,
            "tracks": track_data,
        }), 200

    except NotFound as err:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": str(err)
        }), 404
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": str(e)
        }), 500


""" 
==================
реализация выборки данных из основной таблицы в виде вложенного JSON
==================
"""

@track_bp.route('/<int:id>/', methods=['GET'])
def get_track(id):
    track = Track.query.filter(Track.id == id).first()
    return jsonify({
        "success": True,
        "track": track_schema.dump(track)
        # "tracks": tracks_no_detail_schema.dump(tracks)
    }), 200

@track_bp.route('filter_by_genre/<int:genre_id>/', methods=['GET'])
def track_by_genre(genre_id):
    try:
        tracks = (
            db.session.query(Track)
            .select_from(Track)
            .join(Genre)
            .filter(Genre.id == genre_id)
            .all()
        )
        found_tracks = tracks_schema.dump(tracks)

        print('[ok]')
        return jsonify({
            "success": True,
            "tracks": found_tracks,
        }), 200
    except ValidationError as err:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": err.messages
        }, 400)
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": str(e)
        }, 500)