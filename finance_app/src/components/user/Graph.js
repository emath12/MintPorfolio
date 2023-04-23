import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React, { useState, useEffect } from 'react';
import axios from "axios";


function DisplayData(props) {
      const [userData, setUserData] = useState([]);

      const [marketData, setMarketData] = useState([]);

      const [xVals, setxVals] = useState([]);

      const [yVals, setyVals] = useState([]);

      // only runs when the component is rendered for the first time, perfect
      // for an API call.
      useEffect(() => {
        
   axios.all([
          axios.get('http://127.0.0.1:5000/current_portfolio', {
            headers: {
              Authorization: 'Bearer ' + props.token
            }
          }),
          axios.get('http://127.0.0.1:5000/market_dataframe', {
            headers: {
              Authorization: 'Bearer ' + props.token
            }
          })
        ]).then(axios.spread((user, market) => {

          let userdata = user.data;
          console.log("the_user_date" + userdata);

          let edited_user_data = [];
          
          for (let i = 0; i <= userdata["Dates"].length - 1; i++) {

            edited_user_data.push([userdata["Dates"][i], userdata["Vals"][i]]);
            xVals.push(userdata["Dates"][i]);
            yVals.push(userdata["Vals"][i]);

          }
          
          setxVals(xVals);

          setUserData(edited_user_data);

          let marketdata = market.data

          let edited_market_data = [];
          
          for (let i = 0; i <= marketdata["Dates"].length - 1; i++) {

            edited_market_data.push([marketdata["Dates"][i], marketdata["Vals"][i]]);
          } 
          
          setMarketData(edited_market_data);   
          
          console.log(edited_market_data);
          console.log(edited_user_data);

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
          type: 'datetime',
          tickInterval: 10 * 30 * 24 * 3600 * 1000,
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

function DisplayStats(props) {

    const [stats, setStats] = useState("");
  
    useEffect(() => {
          
        axios.get('http://127.0.0.1:5000/stats', {
          headers: {
            Authorization: 'Bearer ' + props.token
          }
        })
          .then(response => {
            console.log("response" + response);
            setStats(response.data);
          })
          .catch(error => console.error(error));

    }, []);

    return (
      <>
        <h1>Performance Metrics:</h1>
        <center>
          <h4>Alpha: {stats.alpha}</h4>
          <h4>Beta: {stats.beta}</h4>
          <h4>Sharpe: {stats.sharpe}</h4>
          <h4>Ret: {stats.ret}</h4>
        </center>
      
      </>

    )

}



function Graph(props) {
  return (
    <>
      <DisplayData
        token={props.token}
      />
      <DisplayStats
        token={props.token}
      />
    </>
  )
}

export default Graph;