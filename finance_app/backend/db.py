import pandas as pd
import yfinance as yf
from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
import json
from flask_session import Session

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app)
# seems to work somewhat randomly?

init_pvalue = 1

class User:
    def __init__(self, name, pwd, date, port: dict):
        self.name = name
        self.pwd = pwd
        self.date = date
        self.port = port

    def __str__(self):
        return f"{self.name}, {self.date}, {self.port}"

    def get_init_pvalue(self):
        retval = 0
        for tkr, i in self.port.items():
            retval += int(i) * yf.Ticker(tkr).history(start=self.date)["Close"][0]

        return retval

    def get_port_df(self):
        df = pd.DataFrame()
        for tkr, i in self.port.items():
            print(i)
            df[tkr] = int(i) * yf.Ticker(tkr).history(start=self.date)["Close"]

        pf = pd.DataFrame()
        pf["Dates"] = df.index.strftime("%Y-%m-%d").tolist()
        pf["Vals"] = df.sum(axis=1).tolist()

        return pf

def get_user_data():
    """
    pulls portfolio data from frontend and stores it in portfolio object
    :return:
    portfolio object
    """

    name = "Joe"
    pwd = "password"
    date = "2023-01-01"
    port = {"AAPL": 10, "MSFT": 10, "AMZN": 10, "NVDA": 10, "BRK-B": 10}

    joe = User(name, pwd, date, port)
    return joe

def get_init_pvalue():
    u1 = get_user_data()
    return u1.get_init_pvalue()


@app.route('/pf_dataframe')
def call_pf():
    u1 = get_user_data()

    pf = u1.get_port_df()

    j_string = json.dumps(pf.to_dict(orient='list'))

    return j_string


@app.route('/market_dataframe')
@cross_origin()
def call_market():
    u1 = get_user_data()
    init_pvalue = u1.get_init_pvalue()

    mkt = yf.Ticker("^GSPC")
    df = pd.DataFrame()
    mkt_hist = mkt.history(start="2023-01-01")["Close"]

    df["mkt"] = (init_pvalue / mkt_hist[0]) * mkt_hist

    pf = pd.DataFrame()
    pf["Dates"] = df.index.strftime("%Y-%m-%d").tolist()
    pf["Vals"] = df.sum(axis=1).tolist()

    j_string = json.dumps(pf.to_dict(orient='list'))

    return j_string

data = None

@app.route('/input_data', methods=['GET', 'POST'])
@cross_origin()
def receive_data():
    global data

    if (request.method == 'POST'):
        data = request.json 
        return 'success'

    elif (request.method == 'GET'): # GET
    

        if data is None:
            return "No data"

        date = data[1]
        port = {}
        for trio in data[0]:
            print("the port")
            port[trio["company"]] = trio["shares"]
            print(port)


        u1 = User(None, None, date, port)
        pf = u1.get_port_df()
        j_string = json.dumps(pf.to_dict(orient='list'))
        
        return j_string


    # print(request.json)
    # data is in the form of
    # [ [list of ticker objects], construction-date ]
    # [[{'id': 0, 'company': 'dd', 'shares': 0}, {'id': 1, 'company': '', 'long': True, 'shares': 0}], '2023-03-08']

if __name__ == '__main__':
    app.run()

# client = RESTClient(api_key="2h4IbRz7WN26U4Ab_9jNphPANUDZyghT")
#
# ticker = "AAPL"
# # List Aggregates (Bars)
# bars = client.get_daily_open_close_agg(ticker="AAPL", date="2023-02-10")
# print(bars)