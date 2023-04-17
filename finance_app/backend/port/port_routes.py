import json
from flask import request
from flask_login import current_user, login_required, LoginManager
from backend.port import port_bp
from flask_cors import CORS, cross_origin
from backend.models import DynamicPortfolio
from backend.database import Portfolio, Position, User, login_manager
import os
from backend import db

data = None
user = None


@port_bp.route('/market_dataframe')
@cross_origin()
@login_required
def call_market():
    if user is None:
        return "no data"

    pf = user.get_market_df()
    print(pf.to_dict(orient='list'))
    j_string = json.dumps(pf.to_dict(orient='list'))

    return j_string

@port_bp.route('/stats', methods=['GET', 'POST'])
@login_required
def call_stats():
    if user is not None:
        j_string = json.dumps(user.get_stats())
        
        return j_string
    
    return "no stats!"

@port_bp.route('/current_portfolio', methods=['GET', 'POST'])
@cross_origin()
@login_required
def update_user():
    global data
    global user

    if request.method == 'POST':
        print("post made")
        data = request.json

        current_user_id = current_user.get_id()
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


