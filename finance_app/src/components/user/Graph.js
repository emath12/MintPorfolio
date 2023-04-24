import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React, { useState, useEffect } from 'react';
import {Container, Card, Row, Col} from 'react-bootstrap';
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
            name: 'The Market',
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
          <br/>
          <div style={{ boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.5)", backgroundColor: "#f9f9e2", borderRadius: "20px", margin: "20px"}}>
            <h1 style={{padding: "10px"}}>Performance Metrics</h1>
            <center>
            <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Alpha: {stats.alpha}
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body"> 
                <p align="left">A measure of the return of your investment that <b>is not</b> attributable to the movements of the general stock market. It is the <b>intercept</b> in your linear regression against the returns of the market.</p>
                
              </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Beta: {stats.beta}
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body"> 
                <p align="left">A measure of the return of your investment that <b>is</b> attributable to the movements of the general stock market. It is the <b>slope</b> in your linear regression against the returns of the market.</p>
              </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Sharpe Ratio: {stats.sharpe}
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body"> 
                <p align="left">Your <b>risk adjusted return,</b> which is equal to your alpha divided by the volatility (standard deviation) of your returns. This gives intuition as to the returns you are generating per unit of riskiness in your portfolio.</p>
              </div>_
              </div>
            </div>
            <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Return: {stats.ret}
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body"> 
                <p align="left">The <b>total percentage return</b> of your portfolio to date.</p>
              </div>
            </div>
          </div>
          </div>
            </center>
          </div>
          
              <br/>
      
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