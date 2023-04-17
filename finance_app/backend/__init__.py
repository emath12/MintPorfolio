from flask import Flask, Blueprint
from flask_session import Session
from flask_cors import CORS, cross_origin
import os
from flask_sqlalchemy import SQLAlchemy
from flask_login import current_user, login_user, LoginManager
import json
from flask import request, session
from flask_cors import CORS, cross_origin
from backend.auth import auth_bp
from flask_login import current_user, login_user, LoginManager, login_required
from werkzeug.security import generate_password_hash, check_password_hash
import yfinance as yf
import pandas as pd
import numpy as np
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import os
from sklearn.linear_model import LinearRegression

Base = declarative_base()

data = None
user = None

basedir = os.path.abspath(os.path.dirname(__file__))

db = SQLAlchemy()
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

class DynamicPortfolio:
    def __init__(self, pwd=None , date=None, port: dict=None):
        self.stats = None
        self.pwd = pwd
        self.date = date
        self.port = port

        # Set initial portfolio value
        self.init_pvalue = 0
        for tkr, i in self.port.items():
            self.init_pvalue += int(i) * yf.Ticker(tkr).history(start=self.date)["Close"][0]

        # make dataframe of time series for portfolio
        df = pd.DataFrame()
        for tkr, i in self.port.items():
            df[tkr] = int(i) * yf.Ticker(tkr).history(start=self.date)["Close"]

        self.df = pd.DataFrame()
        self.df["Dates"] = df.index.astype(np.int64) / int(1e6)
        self.df["Vals"] = df.sum(axis=1).tolist()

        # make dataframe of time series for market
        mkt = yf.Ticker("^GSPC")
        df = pd.DataFrame()
        mkt_hist = mkt.history(start=self.date)["Close"]
        df["mkt"] = (self.init_pvalue / mkt_hist[0]) * mkt_hist
        self.market = pd.DataFrame()
        self.market["Dates"] = df.index.astype(np.int64) / int(1e6)  # Convert Timestamps to strings
        self.market["Vals"] = df.sum(axis=1).tolist()

    def __str__(self):
        return f"{self.stats}, {self.pwd}, {self.date}, {self.port}"

    def get_init_pvalue(self):
        return self.init_pvalue

    def get_port_df(self):
        return self.df

    def get_market_df(self):
        return self.market

    def get_stats(self):
        if self.stats is None:
            self.stats = {}
            returns = self.df["Vals"].pct_change().dropna()
            mkt_returns = self.market["Vals"].pct_change().dropna()
            model = LinearRegression()
            model.fit(mkt_returns.to_numpy().reshape(-1, 1), returns)
            self.stats["alpha"] = model.intercept_
            self.stats["beta"] = model.coef_[0]
            self.stats["sharpe"] = returns.mean() / returns.std()
            self.stats["ret"] = (self.df["Vals"].iloc[len(self.df) - 1] - self.df["Vals"][0]) / self.df["Vals"][0]
            return self.stats
        else:
            return self.stats

login_manager = LoginManager()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'dsdkfwfjfjk'
    app.secret_key = 'dsdkfwfjfjk!'
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI') \
                                            or 'sqlite:///' + os.path.join(basedir, 'application.db')

    CORS(app)

    db.init_app(app)

    login_manager.init_app(app)

    return app

app = create_app()

@login_manager.user_loader
def load_user(user_id):
    return User.get_id(User.id == user_id)

@app.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    login_details = request.json

    if request.method == 'POST':

        username = login_details[0]
        password = login_details[1]

        user = User.query.filter_by(user=username).first()

        if user:
            print("login-trigger")
            login_user(user)
            print("cur user")
            print(current_user)
            session["user_id"] = current_user.get_id()
            print(session["user_id"])
            return "success"

    print("login did not trigger")

    return "fail"
@app.route('/logout', methods=['POST'])
def the_logout():
    print("received logout request")
    print(current_user)
    return "success"


@app.route('/sign-up', methods=['GET', 'POST'])
@cross_origin()
def the_signup():
    login_details = request.json

    if request.method == 'POST':
        username = login_details[0]
        password = login_details[1]

        already_exists = User.query.filter_by(user=username).first()

        print(already_exists)

        if already_exists:
            print("user already exists!")
            exit(1)

        new_user = User(user=username,
                        password=generate_password_hash(password))
        print(new_user)

        db.session.add(new_user)
        db.session.commit()

        login_user(new_user, remember=True)
        print(current_user)

        return "success"


@app.route('/profile', methods=['GET'])
def profile():
    print(current_user)
    return "success"

@app.route('/market_dataframe')
@cross_origin()
def call_market():
    if user is None:
        return "no data"

    pf = user.get_market_df()
    print(pf.to_dict(orient='list'))
    j_string = json.dumps(pf.to_dict(orient='list'))

    return j_string


@app.route('/stats', methods=['GET', 'POST'])
def call_stats():
    if user is not None:
        j_string = json.dumps(user.get_stats())

        return j_string

    return "no stats!"


@app.route('/current_portfolio', methods=['GET', 'POST'])
@cross_origin()
def update_user():
    global data
    global user

    if request.method == 'POST':
        print("post made")
        data = request.json

        current_user_id = current_user.get_id()
        print(current_user_id)

        date = data[1]
        port = {}

        new_portfolio = Portfolio(user_id=current_user_id,
                                  user=User.query.filter_by(id=current_user_id).first(),
                                  date=date)

        for trio in data[0]:
            port[trio["company"]] = trio["shares"]
            new_position = Position(portfolio_id=new_portfolio.id,
                                    ticker=trio['company'],
                                    amount=trio['shares'])
            db.session.add(new_position)

        db.session.add(new_portfolio)
        db.session.commit()

        user = DynamicPortfolio(date=date, port=port)
        print(user)

        return 'success'

    elif request.method == 'GET':  # GET
        print("get made")

        if data is None or user is None:
            return "No data"

        pf = user.get_port_df()
        j_string = json.dumps(pf.to_dict(orient='list'))

        return j_string