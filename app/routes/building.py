from flask import Blueprint, jsonify, request
from app.models.building import Building
from app.extensions import db

building_bp = Blueprint('building', __name__)


@building_bp.route('/', methods=['GET'])
def get_buildings():
    buildings = Building.query.all()
    return jsonify({
        "success": True,
        "buildings": str(buildings)
    }), 200

@building_bp.route('/<int:id>/', methods=['GET'])
def get_one_building(id):
    building = Building.query.get(id)
    if not building:
        return jsonify({
            "success": True,
            "errors": 'Building not found'
        }), 200
    return jsonify({
        "success": True,
        "building": str(building)
    }), 200

@building_bp.route('/', methods=['POST'])
def set_buildings():
    try:
        validated_data = request.get_json()
        building = Building(
            title=validated_data['year'],
            type_building_id=validated_data['type_building_id'],
            city_id=validated_data['city_id'],
            year=validated_data['year'],
            height=validated_data['height']
        )

        db.session.add(building)
        db.session.commit()

        return jsonify({
            "success": True,
            "building": str(building)
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": True,
            "errors": str(e)
        }), 200

@building_bp.route('/<int:id>/', methods=['PUT'])
def put_building(id):
    try:
        print(request)
        validated_data = request.get_json()
        building = Building.query.get(id)
        if not building:
            raise ValueError('Building not found')
        print(validated_data)
        for key, value in validated_data.items():
            setattr(building, key, value)
        db.session.add(building)
        db.session.commit()
        return jsonify({
            "success": True,
            "building": str(building)
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": str(e)
        }), 500


@building_bp.route('/<int:id>/', methods=['DELETE'])
def delete_building(id):
    try:
        building = db.session.query(Building).get(id)
        if not building:
            raise ValueError('Building not found')

        db.session.delete(building)
        db.session.commit()
        return jsonify({
            "success": True,
            "building": str(building)
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "errors": str(e)
        }), 500
