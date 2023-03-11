import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React, { useState, useEffect } from 'react';

function DisplayData() {
      const [data, setData] = useState([]);

      useEffect(() => {
        fetch('http://127.0.0.1:5000/dataframe')
          .then(response => response.json())
          .then(data => {
            setData(data)
          })
          .catch(error => console.error(error));
      }, []);

      const options = {

        chart: {
            height: 400
        },
      
        title: {
            text: 'Highcharts Stock Responsive Chart'
        },
      
        subtitle: {
            text: 'Click small/large buttons or change window size to test responsiveness'
        },
      
        rangeSelector: {
            selected: 1
        },
      
        series: [{
            name: 'AAPL Stock Price',
            data: data,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            }
        }],
      
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


const options = {

  chart: {
      height: 400
  },

  title: {
      text: 'Highcharts Stock Responsive Chart'
  },

  subtitle: {
      text: 'Click small/large buttons or change window size to test responsiveness'
  },

  rangeSelector: {
      selected: 1
  },

  series: [{
      name: 'AAPL Stock Price',
      data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9],
      type: 'area',
      threshold: null,
      tooltip: {
          valueDecimals: 2
      }
  }],

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

function Graph() {
  return (
    <div>
    <DisplayData/>
  </div>
  )
}

export default Graph;