from flask import Blueprint, jsonify
from sqlalchemy import func, desc
from app.schemas.aggregate import all_buildings_schema, all_stats_schema
from app.models.aggregate import get_all_buildings, get_stats_by_build_type, get_stats_by_country, get_stats_by_year

aggregate_bp = Blueprint('aggregate', __name__)


@aggregate_bp.route('/all/', methods=['GET'])
def all_buildings():
    results = get_all_buildings()
    print(results)
    return jsonify({
        "success": True,
        "all_buildings": all_buildings_schema.dump(results)
    }), 200


@aggregate_bp.route('/type-building/', methods=['GET'])
def all_stats_by_type():
    results = get_stats_by_build_type()
    return jsonify({
        "success": True,
        "stats": all_stats_schema.dump(results)
    }), 200


@aggregate_bp.route('/country/', methods=['GET'])
def all_stats_country():
    results = get_stats_by_country()
    return jsonify({
        "success": True,
        "stats": all_stats_schema.dump(results)
    }), 200


@aggregate_bp.route('/year/', methods=['GET'])
def all_stats_year():
    results = get_stats_by_year()
    return jsonify({
        "success": True,
        "stats": all_stats_schema.dump(results)
    }), 200
