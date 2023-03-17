import pandas as pd
import yfinance as yf
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
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
            retval += i*yf.Ticker(tkr).history(start=self.date)["Close"][0]

        return retval

    def get_port_df(self):
        df = pd.DataFrame()
        for tkr, i in self.port.items():
            df[tkr] = i*yf.Ticker(tkr).history(start=self.date)["Close"]

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
    print(joe)
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
def call_market():
    u1 = get_user_data()
    init_pvalue = u1.get_init_pvalue()

    mkt = yf.Ticker("^GSPC")
    df = pd.DataFrame()
    mkt_hist = mkt.history(start="2023-01-01")["Close"]

    df["mkt"] = (init_pvalue / mkt_hist[0]) * mkt_hist

    pf = pd.DataFrame()
    pf["Dates"] = df.index.strftime("%Y-%m-%d").tolist()  # Convert Timestamps to strings
    pf["Vals"] = df.sum(axis=1).tolist()

    j_string = json.dumps(pf.to_dict(orient='list'))

    return j_string


@app.route('/input_data', methods=['POST'])
def receive_data():
    print("got here!")
    print(request.json)
    return request.json

if __name__ == '__main__':
    app.run()

# client = RESTClient(api_key="2h4IbRz7WN26U4Ab_9jNphPANUDZyghT")
#
# ticker = "AAPL"
# # List Aggregates (Bars)
# bars = client.get_daily_open_close_agg(ticker="AAPL", date="2023-02-10")
# print(bars)