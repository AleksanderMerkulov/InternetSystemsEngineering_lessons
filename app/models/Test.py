from app.extensions import db


class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=True, nullable=False)
    test_type = db.Column(db.String(2), nullable=False)

    items = db.relationship('TestItem', back_populates='test', cascade='all, delete-orphan')


class TestItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(150), nullable=False)
    answer = db.Column(db.String(150), nullable=False)

    # Внешний ключ на таблицу test
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'), nullable=False)

    # Обратная связь
    test = db.relationship('Test', back_populates='items')


def get_all_tests():
    return Test.query.options(db.joinedload(Test.items)).all()
