from flask import Blueprint

auth_bp = Blueprint("auth", __name__)

from backend.auth import auth_routes