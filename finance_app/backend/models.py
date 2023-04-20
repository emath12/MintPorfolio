from . import db
import yfinance as yf
import pandas as pd
import numpy as np

from sklearn.linear_model import LinearRegression

class DynamicPortfolio:
    def __init__(self, pwd=None , date=None, port: dict=None):
        self.stats = None
        self.pwd = pwd
        self.date = date
        self.port = port

        # Set initial portfolio value
        self.init_pvalue = 0
        for tkr, i in self.port.items():
            self.init_pvalue += int(i) * yf.Ticker(tkr).history(start=self.date)["Close"][0]

        # make dataframe of time series for portfolio
        df = pd.DataFrame()
        for tkr, i in self.port.items():
            df[tkr] = int(i) * yf.Ticker(tkr).history(start=self.date)["Close"]

        self.df = pd.DataFrame()
        self.df["Dates"] = df.index.astype(np.int64) / int(1e6)
        self.df["Vals"] = df.sum(axis=1).tolist()

        # make dataframe of time series for market
        mkt = yf.Ticker("^GSPC")
        df = pd.DataFrame()
        mkt_hist = mkt.history(start=self.date)["Close"]
        df["mkt"] = (self.init_pvalue / mkt_hist[0]) * mkt_hist
        self.market = pd.DataFrame()
        self.market["Dates"] = df.index.astype(np.int64) / int(1e6)  # Convert Timestamps to strings
        self.market["Vals"] = df.sum(axis=1).tolist()

    def __str__(self):
        return f"{self.stats}, {self.pwd}, {self.date}, {self.port}"

    def get_init_pvalue(self):
        return self.init_pvalue

    def get_port_df(self):
        return self.df

    def get_market_df(self):
        return self.market

    def get_stats(self):
        if self.stats is None:
            self.stats = {}
            returns = self.df["Vals"].pct_change().dropna()
            mkt_returns = self.market["Vals"].pct_change().dropna()
            model = LinearRegression()
            model.fit(mkt_returns.to_numpy().reshape(-1, 1), returns)
            self.stats["alpha"] = model.intercept_
            self.stats["beta"] = model.coef_[0]
            self.stats["sharpe"] = returns.mean() / returns.std()
            self.stats["ret"] = (self.df["Vals"].iloc[len(self.df) - 1] - self.df["Vals"][0]) / self.df["Vals"][0]
            return self.stats
        else:
            return self.stats