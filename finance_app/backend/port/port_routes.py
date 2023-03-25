import json

from flask import request

from backend.models import User, Portfolio
from backend.port import port_bp
from flask_cors import CORS, cross_origin


data = None
current_user = None


@port_bp.route('/market_dataframe')
@cross_origin()
def call_market():
    if current_user is None:
        return "no data"

    pf = current_user.get_market_df()
    j_string = json.dumps(pf.to_dict(orient='list'))

    return j_string

@port_bp.route('/stats', methods=['GET', 'POST'])
def call_stats():
    update_user()
    j_string = json.dumps(current_user.get_stats())
    return j_string

@port_bp.route('/current_portfolio', methods=['GET', 'POST'])
@cross_origin()
def update_user():
    global data
    global current_user

    if request.method == 'POST':
        print("post made")
        data = request.json

        date = data[1]
        port = {}
        for trio in data[0]:
            port[trio["company"]] = trio["shares"]

        current_user = Portfolio(date=date, port=port)

        return 'success'

    elif request.method == 'GET':  # GET
        print("get made")

        if data is None or current_user is None:
            return "No data"

        pf = current_user.get_port_df()
        j_string = json.dumps(pf.to_dict(orient='list'))

        return j_string


