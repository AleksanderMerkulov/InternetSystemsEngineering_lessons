from flask import Flask
from .extensions import db
from .config import DevelopmentConfig
from flask_cors import CORS
# Импортируем маршруты
from .routes import title, track, aggregate


def create_app():
    app = Flask(__name__)
    CORS(app,
         origins=["http://localhost:3000"],
         supports_credentials=True,
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         allow_headers=["Content-Type", "Authorization"]
         )
    app.config.from_object(DevelopmentConfig)
    app.json.ensure_ascii = False

    # Инициализация расширений
    db.init_app(app)
    # Регистрация Blueprint-ов
    app.register_blueprint(title.bp_title, url_prefix="/api/v1/title")
    app.register_blueprint(track.track_bp, url_prefix="/api/v1/track")
    app.register_blueprint(aggregate.aggregate_bp, url_prefix="/api/v1/aggregate")

    return app
