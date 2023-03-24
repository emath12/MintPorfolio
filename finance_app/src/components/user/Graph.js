import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React, { useState, useEffect } from 'react';
import axios from "axios";


function DisplayData() {
      const [userData, setUserData] = useState([]);

      const [marketData, setMarketData] = useState([]);

      const [xVals, setxVals] = useState([]);

      const [yVals, setyVals] = useState([]);

      // only runs when the component is rendered for the first time, perfect
      // for an API call.
      useEffect(() => {
        
        axios.all([
          axios.get('http://127.0.0.1:5000/input_data'),
          axios.get('http://127.0.0.1:5000/market_dataframe')
        ])

        .then(axios.spread((user, market) => {

          let userdata = user.data

          var edited_user_data = [];
          
          for (let i = 0; i <= userdata["Dates"].length - 1; i++) {

            edited_user_data.push([userdata["Dates"][i], userdata["Vals"][i]]);
            xVals.push(userdata["Dates"][i]);
            yVals.push(userdata["Vals"][i]);

          }
          
          setxVals(xVals);

          setUserData(edited_user_data);

          let marketdata = market.data

          var edited_market_data = [];
          
          for (let i = 0; i <= marketdata["Dates"].length - 1; i++) {

            edited_market_data.push([marketdata["Dates"][i], marketdata["Vals"][i]]);
          } 
          
          console.log("market" + edited_market_data);
          setMarketData(edited_market_data);

          console.log("finish" + edited_market_data.length)
          console.log(edited_user_data.length);

        })).catch(error => console.error(error));
    
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

        xAxis: {
          categories : xVals,
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
      },

        
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