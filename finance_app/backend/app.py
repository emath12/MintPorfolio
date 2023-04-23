from flask import Flask, request, jsonify, session
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
from sqlalchemy import Column, Integer, String, ForeignKey, Float, ARRAY
from flask_login import UserMixin

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
    portfolios = Column(String)
    shares = Column(String)
    construct_date = Column(String)
    def get_id(self):
        return self.id

    def get_username(self):
        return self.username

    # def set_password(self, password):
    #     self.password = generate_password_hash(password)
    #
    # def check_password(self, password):
    #     return check_password_hash(self.password, password)

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

        username = request.json.get("username")
        password = request.json.get("password")

        logged_in_user = User.query.filter_by(user=username).first()

        if not logged_in_user:
            return jsonify({
                "type": "error",
                "message": "User does not exist! Create an Account!"
            }), 200

        if password == logged_in_user.password:

            access_token = create_access_token(identity=username)

            response = jsonify(
                {
                    "type": "success",
                    "access_token": access_token,
                }
            )

            print("login successful")

            return response

        else:

            print("incorrect password")

            return jsonify({
                "type": "error",
                "message": "Incorrect Password!"
            }), 200

    print("login did not trigger")

    return "login did not trigger", 404

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route("/get_user", methods=["GET"])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    current_user = User.query.filter_by(user=current_user).first()

    cur_user_ports = current_user.portfolios.split(",")
    cur_user_shares = current_user.shares.split(",")

    positions = []

    for i, user_port in enumerate(cur_user_ports):
        if not user_port == "start" and not user_port == "":
            positions.append([user_port, cur_user_shares[i]])

    response = jsonify(
        {
            "username": current_user.user,
            "positions": positions
        }
    )

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
            return jsonify({
                "type" : "error",
                "message" : "User already exists!"
            }), 200

        access_token = create_access_token(identity=username)

        new_user = User(user=username,
                        password=password,
                        token=access_token
        )

        db.session.add(new_user)
        db.session.commit()

        response = jsonify(
            {
                "type": "success",
                "access_token": access_token,
            }
        )

        return response, 200

    return "Error", 404



@app.route("/update_portfolio", methods=['POST'])
@jwt_required()
@cross_origin()
def update_portfolio():
    tickers = request.json["tickers"]
    shares_amounts = request.json["share_amounts"]

    current_user = get_jwt_identity()
    current_user = User.query.filter_by(user=current_user).first()

    for i, ticker in enumerate(tickers):
        new_ticker = ticker + ","
        new_share_amount = str(shares_amounts[i]) + ','

        if current_user.portfolios is None:
            current_user.portfolios = "start,"

        if current_user.shares is None:
            current_user.shares = "start,"

        cur_port_list = current_user.portfolios.split(",")
        cur_shares_list = current_user.shares.split(",")

        print(cur_shares_list)

        if ticker in cur_port_list:
            ticker_index = cur_port_list.index(ticker)
            cur_shares_list[ticker_index] = shares_amounts[i]
            current_user.shares = ",".join(cur_shares_list)

        else:
            current_user.portfolios += new_ticker
            current_user.shares += new_share_amount

        current_user.construct_date = request.json["construct_date"]

        print(current_user.portfolios)
        print(current_user.shares)
        print(current_user.construct_date)

    db.session.commit()
    return "success"

@app.route('/profile')
@jwt_required(optional=True)
@cross_origin()
def my_profile():

    verify_jwt_in_request()

    current_user = get_jwt_identity()

    current_user = User.query.filter_by(user=current_user).first()

    return "success", 200

@app.route("/logged_in_check", methods=['GET', 'POST'])
@cross_origin()
@jwt_required(optional=True)
def log_in_check():

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
@jwt_required()
def call_market():

    current_user = get_jwt_identity()
    print(current_user)
    current_user = User.query.filter_by(user=current_user).first()

    cur_user_ports = current_user.portfolios.split(",")
    cur_user_shares = current_user.shares.split(",")

    port = {}

    for i, user_port in enumerate(cur_user_ports):
        if not user_port == "start" and not user_port == "":
            port[user_port] = cur_user_shares[i]

    print(port)

    dyn_port = DynamicPortfolio(date=current_user.construct_date, port=port)

    pf = dyn_port.get_market_df()
    j_string = json.dumps(pf.to_dict(orient='list'))

    return j_string

@app.route('/stats', methods=['GET', 'POST'])
@cross_origin()
@jwt_required()
def call_stats():

    print("stats triggered")

    current_user = get_jwt_identity()
    print(current_user)
    current_user = User.query.filter_by(user=current_user).first()

    cur_user_ports = current_user.portfolios.split(",")
    cur_user_shares = current_user.shares.split(",")

    port = {}

    for i, user_port in enumerate(cur_user_ports):
        if not user_port == "start" and not user_port == "":
            port[user_port] = cur_user_shares[i]

    print(port)

    dyn_port = DynamicPortfolio(date=current_user.construct_date, port=port)


    j_string = json.dumps(dyn_port.get_stats())

    return j_string

@app.route('/current_portfolio', methods=['GET'])
@cross_origin()
@jwt_required()
def push_portfolio_data():

    if request.method == 'GET':

        current_user = get_jwt_identity()
        current_user = User.query.filter_by(user=current_user).first()
        print(current_user)

        cur_user_ports = current_user.portfolios.split(",")
        cur_user_shares = current_user.shares.split(",")

        port = {}

        for i, user_port in enumerate(cur_user_ports):
            if not user_port == "start" and not user_port == "":
                port[user_port] = cur_user_shares[i]

        print(port)

        dyn_port = DynamicPortfolio(date=current_user.construct_date, port=port)

        pf = dyn_port.get_port_df()
        j_string = json.dumps(pf.to_dict(orient='list'))

        return j_string
@app.errorhandler(401)
def custom_401(error):

    response = jsonify(
        {
            "logged_in": False,
        }
    )

    return response

# @jwt.expired_token_loader
# def handle_expired_token_error(expired_token):
#     print("token expired")
#     return jsonify({
#         'logged_in': False,
#     }), 200
#
# @jwt.invalid_token_loader
# def handle_invalid_token_error(error_string):
#     print("invalid token")
#     return jsonify({
#         'logged_in': False,
#     }), 200


