# <span style="color:skyblue"> BULLdog MARKET </span>
## Yale CPSC 419
### Project Group 14
* Taimur Moolji
* Ethan Mathieu
* Daphne Raskin
* Kenan Collignon


## Project Overview
Due to lack of subject knowledge, individual investors
are unable to access certain metrics regarding the strength
and performance of their portfolios that many institutional 
investors have quick access to. This vastly reduces the
potential success of individuals who would like to invest
actively, rather than placing their money in indices 
and mutual funds. This project is provides an easy-to-use
interface through which individuals can evaluate their
portfolio’s performance against that of the market and
see where their various risk exposures lie.

## Quickstart
*Steps 1 and 2 only need to be completed the first time*

1) Make the following installations via pip:
   1) yfinance
   2) pandas
   3) numpy
   4) flask
   5) flask_cors
   6) SQLAlchemy
   7) Sklearn
   8) flask_login
   
2) Make the following installations via npm
   1) highcharts
   2) reactbootstrap
3) From inside the finance_app directory, run "flask run".
4) From inside the finace_app directory, run "npm start".


## Packages Used
**Backend**
Flask, Flask-Login, Flask Cors, 

**Frontend**
Highcharts (for stock market rendering)
React-Boostrap (https://react-bootstrap.github.io/components/navbar/)

## Versions

### MVP
Graphed static portfolio consisting of 10 shares each AAPL, MSFT,
BRK.B, NVDA, and AMZN constructed on 01/01/2023 vs market return
over the same time period

### Alpha
Allowed for user input of portfolio data (date created, tickers,
number of shares), and calculated portfolio key metrics.

### Beta
Added db side for userauth, which allows users to create profiles and
portfolios associated with those profiles. Login between sessions is 
functional, but somewhat buggy. Look in the root.js file for the frontend
portion of db auth/ login. The frontend for db auth not been hooked up yet.
All of these issues are what remain to be solved by the final product.
Also, we are aware there are some reduncies with the flask app the model code,
we are trying to debug the issue with auth, so are demodularizing some of the code.

### Final
Added error-handling for user-inputted tickers. Currently filter-select button contains 503 S&P 500 tickers; the Yahoo Finance API has 100000+ valid tickers (accessible in "user/YahooFinanceTickers.csv"), so future iterations of the project may redesign filter-select to have much greater drop-down menu capacity.
