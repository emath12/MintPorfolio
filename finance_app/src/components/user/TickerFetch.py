import csv
import json

'''
TickerFetch.py was used to select S&P 500 tickers and format them into a well-formatted dictionary to be used in the bootstrap filter select element in /select
'''

csv_filename = 'SP500tickers.csv'

options = []

with open(csv_filename) as f:
    file = open("Options.txt", "w")
    reader = csv.DictReader(f)
    i = 0
    for row in reader:
        option = {'value': row["Symbol"].lower(), 'label': row["Symbol"]}
        file.write(str(option))
        file.write(", ")
        i += 1
        
    file.close()
    print(i)
        