from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from werkzeug.exceptions import NotFound

from app.models.album import Album
from app.models.track import Track
from app.extensions import db, auth
from app.schemas.track import tracks_schema, track_schema

track_bp = Blueprint('track', __name__)


@track_bp.route('/', methods=['GET'])
def get_tracks():
    tracks = Track.query.all()
    return jsonify({
        "success": True,
        "tracks": tracks_schema.dump(tracks)
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

