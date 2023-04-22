from flask import Flask, request, jsonify, session
from flask_session import Session
import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager, verify_jwt_in_request

from flask_sqlalchemy import SQLAlchemy
import json
from flask import request, session
from flask_cors import CORS, cross_origin
import os

from backend.models import DynamicPortfolio

from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from flask_login import UserMixin

data = None
user = None

basedir = os.path.abspath(os.path.dirname(__file__))


app = Flask(__name__)

app.config["SECRET_KEY"] = 'dsdkfwfjfjk'
app.secret_key = 'dsdkfwfjfjk'
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI') \
                                        or 'sqlite:///' + os.path.join(basedir, 'application.db')

app.config['SESSION_TYPE'] = 'filesystem'
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config['JWT_ERROR_MESSAGE_KEY'] = None  # disable automatic 401 error


db = SQLAlchemy(app)

Base = declarative_base()

class User(Base, db.Model, UserMixin):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    user = Column(String, unique=True)
    token = Column(String, unique=True)
    password = Column(String)
    portfolios = relationship("Portfolio", back_populates="user")
    def get_id(self):
        return self.id

    def get_username(self):
        return self.username

    # def set_password(self, password):
    #     self.password = generate_password_hash(password)
    #
    # def check_password(self, password):
    #     return check_password_hash(self.password, password)
class Portfolio(Base, UserMixin):
    __tablename__ = 'portfolios'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    user = relationship("User", back_populates="portfolios")
    date = Column(String)
    positions = relationship("Position", back_populates="portfolio")

    def get_id(self):
        return self.id

    @classmethod
    def get_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

class Position(Base):
    __tablename__ = 'positions'
    id = Column(Integer, primary_key=True)
    portfolio_id = Column(Integer, ForeignKey('portfolios.id'))
    portfolio = relationship("Portfolio", back_populates="positions")
    ticker = Column(String)
    amount = Column(Float)

with app.app_context():
    db.create_all()

CORS(app, supports_credentials=True)

jwt = JWTManager(app)
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():

    if request.method == 'POST':

        print("login triggered")

        username = request.json.get("username")
        password = request.json.get("password")

        logged_in_user = User.query.filter_by(user=username).first()
        print(logged_in_user)

        if not logged_in_user:
            print("login failed")
            return "user does not exist! Create an account", 405

        if password == logged_in_user.password:

            access_token = create_access_token(identity=username)

            response = jsonify(
                {
                    "success": True,
                    "access_token": access_token,
                }
            )

            print("login successful")

            return response

        else:

            print("login failed")
            return "incorrect password!", 405


    print("login did not trigger")

    return "login did not trigger", 404

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@app.route('/sign-up', methods=['GET', 'POST'])
@cross_origin()
def the_signup():
    login_details = request.json

    if request.method == 'POST':
        username = login_details[0]
        password = login_details[1]

        already_exists = User.query.filter_by(user=username).first()

        if already_exists:
            print("user already exists!")
            return "user already exists", 404

        access_token = create_access_token(identity=username)

        new_user = User(user=username,
                        password=password,
                        token=access_token
        )

        db.session.add(new_user)
        db.session.commit()

        response = jsonify(
            {
                "success": True,
                "access_token": access_token,
            }
        )

        return response, 200

    return "Error", 404

@app.route('/profile')
@jwt_required(optional=True)
@cross_origin()
def my_profile():

    verify_jwt_in_request()

    current_user = get_jwt_identity()

    current_user = User.query.filter_by(user=current_user).first()

    print(current_user)

    print(current_user.id)

    return "success", 200

@app.route("/logged_in_check", methods=['GET', 'POST'])
@cross_origin()
@jwt_required(optional=True)
def log_in_check():

    print("here")

    verify_jwt_in_request()

    print(get_jwt_identity())

    if get_jwt_identity():

        print("true")

        response = jsonify(
            {
                "logged_in" : True
            }
        )

        return response

    else:

        print("false")

        response = jsonify(
            {
                "logged_in": False
            }
        )

        return response

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
        print(data)

        current_user_id = session.get("user_id")
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
@app.errorhandler(401)
def custom_401(error):

    print("custom 401")
    print(error)

    response = jsonify(
        {
            "logged_in": False,
        }
    )

    return response

@jwt.expired_token_loader
def handle_expired_token_error(expired_token):
    print("lol")
    return jsonify({
        'status': 401,
        'sub_status': 'expired_token',
        'message': 'The token has expired'
    }), 401

@jwt.invalid_token_loader
def handle_invalid_token_error(error_string):
    print("lol")
    return jsonify({
        'status': 401,
        'sub_status': 'invalid_token',
        'message': 'The token is invalid'
    }), 401

