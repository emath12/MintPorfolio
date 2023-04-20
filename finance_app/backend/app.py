from flask import Flask, request, jsonify, session
from flask_session import Session
import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from flask_sqlalchemy import SQLAlchemy
import json
from flask import request, session
from flask_cors import CORS, cross_origin
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

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["SECRET_KEY"] = 'dsdkfwfjfjk'
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI') \
                                        or 'sqlite:///' + os.path.join(basedir, 'application.db')
server_session = Session(app)
db.init_app(app)


login_manager = LoginManager()
login_manager.init_app(app)
class User(Base, db.Model, UserMixin):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    user = Column(String, unique=True)
    password = Column(String)
    portfolios = relationship("Portfolio", back_populates="user")

    @login_manager.user_loader
    def load_user(user_id):
        # Load a user from the database based on the user ID
        # Return None if the user does not exist
        return User.query.get(int(user_id))
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


@app.route('/get_user', methods=['GET'])
def get_user():
    user_id = session.get("user_id")

    if not user_id:
        return "error"
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({"id": user.id, "user": user.user})


@app.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    login_details = request.json

    if request.method == 'POST':

        username = login_details[0]
        password = login_details[1]

        logged_in_user = User.query.filter_by(user=username).first()

        if logged_in_user:
            print("login-trigger")
            login_user(logged_in_user)
            print("cur user")
            session["user_id"] = logged_in_user.id
            return jsonify({"id": logged_in_user.id})

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

        response = jsonify({'success': True})
        response.set_cookie("user_id", str(new_user.id))
        return response

    return "Invalid request method"

@app.route('/profile', methods=['GET'])
def profile():
    print(current_user)
    cookie = request.cookies.get("user_id")
    print(cookie)
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
@jwt_required()
def update_user():
    global data
    global user

    if request.method == 'POST':
        print("post made")
        data = request.json

        current_user_id = current_user.get_id()
        print("current user:")
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
    
@app.route('/login_status')
def login_status():
    return jsonify({'logged_in': session.get('logged_in', False)})