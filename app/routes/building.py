from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from werkzeug.exceptions import NotFound

from app.models.building import Building
from app.extensions import db, auth
from app.schemas.building import buildings_schema, building_schema

building_bp = Blueprint('building', __name__)


@building_bp.route('/', methods=['GET'])
def get_buildings():
    buildings = Building.query.all()
    return jsonify({
        "success": True,
        "buildings": buildings_schema.dump(buildings)
    }), 200


@building_bp.route('/<int:id>/', methods=['GET'])
def get_one_building(id):
    building = Building.query.get(id)
    if not building:
        return jsonify({
            "success": True,
            "errors": 'Building not found'
        }), 404
    return jsonify({
        "success": True,
        "building": building_schema.dump(building),
    }), 200


@building_bp.route('/', methods=['POST'])
@auth.login_required()
def set_buildings():
    try:
        data = request.get_json()
        building = building_schema.load(data, session=db.session)

        print('[ok]')
        db.session.add(building)
        db.session.commit()
        return jsonify({
            "success": True,
            "building": building_schema.dump(building),
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


@building_bp.route('/<int:id>/', methods=['PUT'])
@auth.login_required()
def put_building(id):
    try:
        data = request.get_json()
        # building = Building.query.get(id)
        building = db.get_or_404(Building, id)
        updated_building = building_schema.load(data,
                                                session=db.session,
                                                instance=building,
                                                partial=True)
        db.session.add(updated_building)
        db.session.commit()
        return jsonify({
            "success": True,
            "building": str(updated_building)
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


@building_bp.route('/<int:id>/', methods=['DELETE'])
@auth.login_required()
def delete_building(id):
    try:
        building = db.get_or_404(Building, id)

        db.session.delete(building)
        db.session.commit()
        return jsonify({
            "success": True,
            "building": str(building)
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
