from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()


class Portfolio(Base):
    __tablename__ = 'portfolio'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    date = Column(String)


class User(Base):
    __tablename__ = 'user'
    username = Column(String, primary_key=True)
    password = Column(String)

class Position(Base):
    __tablename__ = 'position'
    port_id = Column(Integer, primary_key=True)
    ticker = Column(String, primary_key=True)
    quantity = Column(Integer)