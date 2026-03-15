from flask import Flask
from .extensions import db
from .config import DevelopmentConfig
# Импортируем маршруты
from .routes import title, building


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    app.json.ensure_ascii = False

    # Инициализация расширений
    db.init_app(app)
    # Регистрация Blueprint-ов
    app.register_blueprint(title.bp_title, url_prefix="/api/v1/title")
    app.register_blueprint(building.building_bp, url_prefix="/api/v1/buildings")

    return app
