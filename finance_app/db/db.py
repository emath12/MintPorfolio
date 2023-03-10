import pandas as pd
from polygon import RESTClient
import yfinance as yf

aapl = yf.Ticker("AAPL")
msft = yf.Ticker("MSFT")
amzn = yf.Ticker("AMZN")
nvda = yf.Ticker("NVDA")
brk = yf.Ticker("BRK-B")

df = pd.DataFrame()

df["aapl"] = 10*aapl.history(start="2023-01-01")["Close"]
df["msft"] = 10*msft.history(start="2023-01-01")["Close"]
df["amzn"] = 10*amzn.history(start="2023-01-01")["Close"]
df["nvda"] = 10*nvda.history(start="2023-01-01")["Close"]
df["brk"] = 10*brk.history(start="2023-01-01")["Close"]

print(df)

# client = RESTClient(api_key="2h4IbRz7WN26U4Ab_9jNphPANUDZyghT")
#
# ticker = "AAPL"
# # List Aggregates (Bars)
# bars = client.get_daily_open_close_agg(ticker="AAPL", date="2023-02-10")
# print(bars)