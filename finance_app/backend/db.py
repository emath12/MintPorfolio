from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Float, Date
from sqlalchemy.orm import relationship, backref
from flask_login import UserMixin
from . import db
import sqlalchemy as alc

Base = declarative_base()
# Base.query = db.query_property()

class User(Base, db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(Integer, primary_key=True)
    user = db.Column(String, unique=True)
    password = db.Column(String)
    portfolios = db.relationship("Portfolio", back_populates="user")

    def get_id(self):
        return self.id

    def get_username(self):
        return self.username
class Portfolio(Base):
    __tablename__ = 'portfolios'
    id = db.Column(Integer, primary_key=True)
    user_id = db.Column(Integer, ForeignKey(User.id))
    user = db.relationship("User", back_populates="portfolios")
    date = db.Column(Date)
    positions = db.relationship("Position", back_populates="portfolio")
class Position(Base):
    __tablename__ = 'positions'
    id = db.Column(Integer, primary_key=True)
    portfolio_id = db.Column(Integer, ForeignKey('portfolios.id'))
    portfolio = db.relationship("Portfolio", back_populates="positions")
    ticker = db.Column(String)
    amount = db.Column(Float)

def init_db():
    pass
    # db.create_all()

if __name__ == '__main__':
    pass
    # init_db()