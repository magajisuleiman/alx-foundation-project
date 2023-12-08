from flask import Blueprint, request, jsonify
from foodie import db
from foodie.db_utils import IdSchema
from foodie.models.menu_category import MenuCategory


menu_category_bp = Blueprint('menu_category', __name__, url_prefix='/api/v1/menu_category')


@menu_category_bp.route('/', methods=['GET'])
def get_menu_categories():
        menu_categories = MenuCategory.query.all()
        if not menu_categories:
            return jsonify({'message': 'Menu categories not found'}), 404
        return jsonify([category.format() for category in menu_categories]), 200