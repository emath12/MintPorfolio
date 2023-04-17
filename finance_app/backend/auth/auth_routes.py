# import json
# from flask import request, session
# from flask_cors import CORS, cross_origin
# from backend.auth import auth_bp
# from backend.database import User
# from flask_login import current_user, login_user, LoginManager, login_required
# from werkzeug.security import generate_password_hash, check_password_hash
# from backend import db
# from backend.models import DynamicPortfolio
# from backend.database import Position, Portfolio, User
#
# data = None
# user = None
#
#
# @auth_bp.route('/login', methods=['GET', 'POST'])
# @cross_origin()
# def login():
#
#     login_details = request.json
#
#     if request.method == 'POST':
#
#         username = login_details[0]
#         password = login_details[1]
#
#         user = User.query.filter_by(user=username).first()
#
#         if user and user.check_password(password):
#             print("login-trigger")
#             login_user(user)
#             print("cur user")
#             print(current_user)
#             session["user_id"] = current_user.get_id()
#             print(session["user_id"])
#             return "success"
#
#     print("login did not trigger")
#
#     return "fail"
#
# @auth_bp.route('/logout', methods=['POST'])
# def the_logout():
#     print("received logout request")
#     print(current_user)
#     return "success"
#
#
# @auth_bp.route('/sign-up', methods=['GET', 'POST'])
# @cross_origin()
# def the_signup():
#
#     login_details = request.json
#
#     if request.method == 'POST':
#         username = login_details[0]
#         password = login_details[1]
#
#         already_exists = User.query.filter_by(user=username).first()
#
#         print(already_exists)
#
#         if already_exists:
#             print("user already exists!")
#             exit(1)
#
#         new_user = User(user=username,
#                         password=generate_password_hash(password))
#         print(new_user)
#
#         db.session.add(new_user)
#         db.session.commit()
#
#         login_user(new_user, remember=True)
#         print(current_user)
#
#         return "success"
#
#
# @login_required
# @auth_bp.route('/profile', methods=['GET'])
# def profile():
#     print(current_user)
#     return "success"
#
# @auth_bp.route('/market_dataframe')
# @cross_origin()
# def call_market():
#     if user is None:
#         return "no data"
#
#     pf = user.get_market_df()
#     print(pf.to_dict(orient='list'))
#     j_string = json.dumps(pf.to_dict(orient='list'))
#
#     return j_string
#
#
# @auth_bp.route('/stats', methods=['GET', 'POST'])
# def call_stats():
#     if user is not None:
#         j_string = json.dumps(user.get_stats())
#
#         return j_string
#
#     return "no stats!"
#
#
# @auth_bp.route('/current_portfolio', methods=['GET', 'POST'])
# @cross_origin()
# def update_user():
#     global data
#     global user
#
#     if request.method == 'POST':
#         print("post made")
#         data = request.json
#
#         current_user_id = current_user.get_id()
#         print(current_user_id)
#
#         date = data[1]
#         port = {}
#
#         new_portfolio = Portfolio(user_id=current_user_id,
#                                   user=User.query.filter_by(id=current_user_id).first(),
#                                   date=date)
#
#         for trio in data[0]:
#             port[trio["company"]] = trio["shares"]
#             new_position = Position(portfolio_id=new_portfolio.id,
#                                     ticker=trio['company'],
#                                     amount=trio['shares'])
#             db.session.add(new_position)
#
#         db.session.add(new_portfolio)
#         db.session.commit()
#
#         user = DynamicPortfolio(date=date, port=port)
#         print(user)
#
#         return 'success'
#
#     elif request.method == 'GET':  # GET
#         print("get made")
#
#         if data is None or user is None:
#             return "No data"
#
#         pf = user.get_port_df()
#         j_string = json.dumps(pf.to_dict(orient='list'))
#
#         return j_string