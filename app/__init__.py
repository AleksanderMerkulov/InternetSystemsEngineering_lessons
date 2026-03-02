from flask import Flask
from .config import DevelopmentConfig

# Импортируем маршруты
from app.views import main
from .crud import create, read, update, delete
from .extensions import db
from .models import Country
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
    # read()
    # delete()

    # country_upload()
    # city_upload()
    # buildings_upload()

    # query()
    # query_sorted()

    # Регистрация Blueprint-ов
    app.register_blueprint(main)

    return app