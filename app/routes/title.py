from flask import Blueprint, jsonify

bp_title = Blueprint('title', __name__)
@bp_title.route('/', methods=['GET'])
def get_title():
 return jsonify({
  "success": True,
  "title": "API по музыке"
 }), 200
