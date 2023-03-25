from flask import Blueprint

port_bp = Blueprint('port', __name__)

# now we also register the blueprints
from backend.port import port_routes