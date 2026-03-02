from .models import *
from .extensions import db

# todo сделать дубль этого проекта по этому датасету
# https://www.kaggle.com/datasets/anurag629/chinook-csv-dataset?utm_source=chatgpt.com&select=InvoiceLine.csv

def query():
    result = db.session.query(TypeBuilding).all()
    print(result)

def query_current_columns():
    result = db.session.query(TypeBuilding.id,
                              TypeBuilding.name).all()
    print(result)

def query_columns_by_name():
    result = db.session.query(Building.title.label('Красивое название'),).all()
    """
    Для того чтобы делать Table.name as NewColumnName
    """
    print(result)

def query_filter():
    result = (db.session.query(Building.title,
                              Building.year)
            .filter(Building.year >= 1900)
              .all())
    print(result, '\n\n============\n')

    r2 = (
        db.session.query(Building.title,
                         Building.year)
        .filter(Building.title.contains('Фед'), Building.year >= 1900)
        .all()
    )
    print(r2)


def query_sorted():
    result = (db.session.query(
        Building.title.label("Здание"),
        Building.year.label("Год"),
        Building.height.label("Высота")
    )
      .order_by("Год", Building.height.desc())
      .all())
    print(result)
