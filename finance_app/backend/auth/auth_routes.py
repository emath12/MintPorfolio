
import json
from flask import request
from flask_cors import CORS, cross_origin
from backend.auth import auth_bp
from werkzeug.security import generate_password_hash, check_password_hash
from backend import db
from backend.db import User, Portfolio, Position


@auth_bp.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    login_details = request.json

    if request.method == 'POST':
        username = login_details[0]
        password = login_details[1]

        user = User.query.filter_by(user=username, password=password).first()
        if user:
            return "success"
        print(username)
        print(password)


        # some sort of db query HERE
        # user = User.query.filter_by(name=username).first()  # returns the first found entry

@auth_bp.route('/logout', methods=['POST'])
def the_logout():
    pass



@auth_bp.route('/sign-up', methods=['GET', 'POST'])
@cross_origin()
def the_signup():

    login_details = request.json

    if request.method == 'POST':
        user = login_details[0]
        password = login_details[1]

        already_exists = User.query.filter_by(user=user).first()

        if already_exists:
            print("user already exists!")
            exit(1)

        new_user = User(user=user,
                        password=generate_password_hash(password, method='sha256'))
    
        # add the new_user to the database

        db.session.add(new_user) # add the new user to the db
        db.session.commit() # commit these changes to the database

        return "success"

