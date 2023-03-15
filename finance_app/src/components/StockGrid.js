import './StockGrid.css';
import React, { Component } from 'react';
import axios from "axios";

class StockGrid extends Component {
    constructor(props) {
      super(props);

      this.state = {
        objects : [],
        size: 0
      }

      this.createNewBlankPosition = this.createNewBlankPosition.bind(this);
    }

    StockRow = (props) => {

        const id = props.id;

        const removeItem = () => {
            const newState = this.state.objects.filter(item => item.id !== id);
          
            this.setState({
              objects: newState,
            });
          };

        const updateCompanyValue = (event) => {
          let initState = this.state.objects;
          for (let i = 0; i < initState.length; i++) {
              if (initState[i].id == id) {
                  initState[i].company = event.target.value;
              }
          }

          this.setState({
            objects : initState,
            size : this.state.objects.size
          });

          console.log(this.state.objects);
        }

        const updateLongShort = (event) => {
          let initState = this.state.objects;
          for (let i = 0; i < initState.length; i++) {
              if (initState[i].id == id) {
                  if (event.target.value == "Long") {
                    initState[i].long = true
                  } else {
                    initState[i].long = false
                  }
              }
          }

          this.setState({
            objects : initState,
            size : this.state.objects.size
          });

          console.log(this.state.objects);
        }

        const updateShareAmount = (event) => {
          let initState = this.state.objects;
          for (let i = 0; i < initState.length; i++) {
              if (initState[i].id == id) {
                  initState[i].shares = event.target.value;
              }
          }

          this.setState({
            objects : initState,
            size : this.state.objects.size
          });

          console.log(this.state.objects);
        }

        return (
          <div className="StockRow" key={id}>
            <input onChange={updateCompanyValue} placeholder="StockRow"></input>
            <select onChange={updateLongShort} name="Long/Short">
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
            <input onChange={updateShareAmount} placeholder="# of Shares"></input>
            <button onClick={removeItem}>Delete</button>
          </div>
        );
    }

    createNewBlankPosition = () => {
        
        let newState = this.state.objects.concat(
            {id: this.state.size,
             company : '',
             long : true,
             shares : 0
            }
        );
        
        this.setState({
            objects : newState,
            size: this.state.size + 1
        });

        console.log(this.state.objects);
    };

    handleSubmit = () => { 
        axios.post('http://127.0.0.1:5000/input_data', this.state.objects)
          .then(response => console.log(response))
          .then(error => console.log(error));
    };

    render() {
        return (
            <div>
                <div className="Stocks">
                    {
                        this.state.objects.map(({id}) => {
                            return <this.StockRow 
                                key={id}
                                id={id}
                            />
                        })
                    }
                </div>
                <div className='ButtonRow'>
                    <button onClick={this.createNewBlankPosition}>Add Position</button>            
                </div>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </div>
        )
      }
}

export default StockGrid;