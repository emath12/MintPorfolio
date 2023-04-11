from flask import Flask, Blueprint
from flask_cors import CORS, cross_origin
import os
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    app.config['SECRET KEY'] = 'dsdkfwfjfjk'
    app.secret_key = 'dsdkfwfjfjk!'
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI') \
                                            or 'sqlite:///' + os.path.join(basedir, 'app.db')

    CORS(app)

    db.init_app(app)

    # registers the routes and stuff for the portfolio
    from backend.port import port_bp as the_main_bp
    app.register_blueprint(the_main_bp)

    from backend.auth import auth_bp as the_auth_bp
    app.register_blueprint(the_auth_bp)

    return app
