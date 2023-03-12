import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React, { useState, useEffect } from 'react';

function DisplayData() {
      const [data, setData] = useState([]);
      const [xVals, setxVals] = useState([]);
      const [yVals, setyVals] = useState([]);

      useEffect(() => {
        fetch('http://127.0.0.1:5000/pf_dataframe')
          .then(response => response.json())
          .then(data => {
            var edited_data = [];

            for (let i = 0; i <= data["Dates"].length - 1; i++) {

              edited_data.push([data["Dates"][i], data["Vals"][i]]);
              xVals.push(data["Dates"][i]);
              yVals.push(data["Vals"][i]);

            } 

            setData(edited_data);
            setxVals(xVals);
            setyVals(yVals);
          })
          .catch(error => console.error(error));
      }, []);

      const options = {

        chart: {
            height: 400
        },
      
        title: {
            text: 'Stock Chart'
        },      
      
        rangeSelector: {
            selected: 1
        },
      
        series: [{
            name: 'Stock Price',
            data: data,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            }
        }],

        xAxis: {
          categories : xVals,

          labels: {
            format: '{value}'
          }
        },

        yAxis : {
          labels : {
            format: '{value}'
          }   
        },
      
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