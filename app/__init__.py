from flask import Flask
from .config import DevelopmentConfig

# Импортируем маршруты
from app.views import main
from .extensions import db
from .models import *
from .query import *
from .upload_db import *


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    # Инициализация расширений
    db.init_app(app)

    # создание базы данных на основе указанных в импорте моделей
    # если модели не импортированы создается пустая база данных
    app.app_context().push()

    # инициализация базы данных и загрузка всех данных
    init_db()


    # Регистрация Blueprint-ов
    app.register_blueprint(main)

    return app