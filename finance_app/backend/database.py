from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import os
from . import db
from backend import login_manager

Base = declarative_base()

class User(Base, db.Model, UserMixin):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    user = Column(String, unique=True)
    password = Column(String)
    portfolios = relationship("Portfolio", back_populates="user")

    def get_id(self):
        return self.id

    def get_username(self):
        return self.username
    
    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
@login_manager.user_loader
def load_user(user_id):
    return User.get_id(User.id == user_id)
        

class Portfolio(Base):
    __tablename__ = 'portfolios'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    user = relationship("User", back_populates="portfolios")
    date = Column(String)
    positions = relationship("Position", back_populates="portfolio")

    def get_id(self):
        return self.id

class Position(Base):
    __tablename__ = 'positions'
    id = Column(Integer, primary_key=True)
    portfolio_id = Column(Integer, ForeignKey('portfolios.id'))
    portfolio = relationship("Portfolio", back_populates="positions")
    ticker = Column(String)
    amount = Column(Float)

def init_db():
    pass

if __name__ == '__main__':
    pass