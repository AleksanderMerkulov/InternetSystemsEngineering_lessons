from flask import Blueprint, jsonify
from sqlalchemy import func, desc

from app.models.Test import get_all_tests
from app.schemas.aggregate import all_time_stats_schema
from app.models.aggregate import get_time_info, get_time_info_by_artist, get_time_info_by_album
from app.schemas.test import tests_schema

aggregate_bp = Blueprint('aggregate', __name__)


@aggregate_bp.route('/genre/', methods=['GET'])
def time_info_by_genre():
    results = get_time_info()
    print(results)
    return jsonify({
        "success": True,
        "data": all_time_stats_schema.dump(results)
    }), 200

@aggregate_bp.route('/artist/', methods=['GET'])
def time_info_by_artist():
    results = get_time_info_by_artist()
    print(results)
    return jsonify({
        "success": True,
        "data": all_time_stats_schema.dump(results)
    }), 200


@aggregate_bp.route('/album/', methods=['GET'])
def time_info_by_album():
    results = get_time_info_by_album()
    print(results)
    return jsonify({
        "success": True,
        "data": all_time_stats_schema.dump(results)
    }), 200


@aggregate_bp.route('/test/', methods=['GET'])
def get_tests():
    results = get_all_tests()
    print(results)
    return jsonify({
        "success": True,
        "data": tests_schema.dump(results)
    }), 200


