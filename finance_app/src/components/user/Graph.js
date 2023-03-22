import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React, { useState, useEffect } from 'react';

function DisplayData() {
      const [userData, setUserData] = useState([]);

      const [marketData, setMarketData] = useState([]);

      const [xVals, setxVals] = useState([]);

      const [yVals, setyVals] = useState([]);

      // only runs when the component is rendered for the first time, perfect
      // for an API call.
      useEffect(() => {
        fetch('http://127.0.0.1:5000/input_data')
          .then(response => response.json())
          .then(data => {

            var edited_data = [];
            
            for (let i = 0; i <= data["Dates"].length - 1; i++) {

              edited_data.push([data["Dates"][i], data["Vals"][i]]);
              xVals.push(data["Dates"][i]);
              yVals.push(data["Vals"][i]);

            } 
            
            setUserData(edited_data);
            setxVals(xVals);
            setyVals(yVals);
          })

        fetch('http://127.0.0.1:5000/market_dataframe')
          .then(response => response.json())
          .then(data => {

            var edited_data = [];
            
            for (let i = 0; i <= data["Dates"].length - 1; i++) {

              edited_data.push([data["Dates"][i], data["Vals"][i]]);
            } 
            
            setMarketData(edited_data);
          })
          .catch(error => console.error(error));
     
      }, []);

      const options = {

        chart: {
            height: 400
        },
         
        scrollbar: {
          enabled: true,
        },
    
        series: [
          {
            name: 'Stock Price',
            data: userData,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            
          },

          {
            name: 'S&P500',
            data: marketData,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            
          }
        ],
      
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    chart: {
                        height: 300
                    },
                    subtitle: {
                        text: null
                    },
                    navigator: {
                        enabled: false
                    }
                }
            }]
        },

        rangeSelector: {
          selected: 4,
          inputEnabled: false,
          buttonTheme: {
              visibility: 'hidden'
          },
          labelStyle: {
              visibility: 'hidden'
          }
      }
        
      };

      return (
        <div>
          <HighchartsReact       
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
        />
        </div>
      );
  }

function Graph() {
  return (
    <div>
      <DisplayData/>
    </div>
  )
}

export default Graph;