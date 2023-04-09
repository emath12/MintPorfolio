
import json
from flask import request
from flask_cors import CORS, cross_origin

from backend.auth import auth_bp
from backend.models import User, Portfolio
from werkzeug.security import generate_password_hash, check_password_hash
from backend.db import db


@auth_bp.route('/login-details', methods=['GET', 'POST'])
@cross_origin()
def login():
    login_details = request.json

    if request.method == 'POST':
        username = login_details[0]
        password = login_details[1]

        user = User.query.filter_by(name=username).first()  # returns the first found entry

        if user:
            if check_password_hash(user.password,
                                   password):  # user is a struct, remember. Hashes password and checks it agaisnt 2nd password
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password, try again!', category='error')
        else:
            flash('Email does not exist', category='error')


@auth_bp.route('/sign-up', methods=['GET', 'POST'])
@cross_origin()
def the_signup():

    login_details = request.json

    print(login_details)

    if request.method == 'POST':
        user = login_details[0]
        password = login_details[1]

        print(user)
        print(password)

        new_user = User\
            (user=user,
             password=generate_password_hash(password, method='sha256'))

        db.session.add(new_user) # add the new user to the db
        db.session.commit() # commit these changes to the database

