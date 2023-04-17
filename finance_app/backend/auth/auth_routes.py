import json
from flask import request, session
from flask_cors import CORS, cross_origin
from backend.auth import auth_bp
from backend.database import User
from flask_login import current_user, login_user, LoginManager
from backend import login_manager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_session import Session
from sqlalchemy import create_engine
import os
from backend import db


@auth_bp.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():

    login_details = request.json
    
    if request.method == 'POST':

        username = login_details[0]
        password = login_details[1]

        user = User.query.filter_by(user=username).first()
                                    
        if user and user.check_password(password):
            print("login-trigger")
            login_user(user)
            session["user_id"] = current_user.get_id()
            print(session["user_id"])
            return "success"

    print("login did not trigger")

    return "fail"

@auth_bp.route('/logout', methods=['POST'])
def the_logout():
    print("received logout request")
    print(current_user)
    return "success"


@auth_bp.route('/sign-up', methods=['GET', 'POST'])
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

        return "success"

