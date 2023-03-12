import './StockGrid.css';
import React, { Component } from 'react';

const StockRow = props => {
    <div>
        <p>{props.name}</p>
        <p>{props.long}</p>
        <p>{props.shares}</p>


    </div>
}


// simply an abstraction for better state management
function stockRowObj(company, long, shares) {
    this.company = company;
    this.long = long;
    this.shares = shares;
}
// create a new stockRowObj with the following syntax: 
// let row = new stockRowObj(company, long, shares)


class StockGrid extends Component {
    constructor(props) {
      super(props);

      this.state = [
        // state will just be an array of stockRowObjects
        // empty to start. This is the state's initial state
      ]
    }

    onSubmit = event => { 
        // do something to the state on submit of the form!

        // hint : add to the state array in some way ?
        // remember you must use setState
        
        // do some research on how to pull from the <form>, there's tons of
        // documentation on this on the interwebs.

        // this.setState(
        //     // something
        // )
    }


    render() {
        return (
        <div>
        
            {
            // click through the state and create a StockRow component for each stock row object in the state
            
            /* <div className='Stocks'>
               {
                this.state.map() => {
                    <stockRowObj
                        name=""
                        long=""
                        shares=""
                    />
                }
               }
            </div> 
            */}
            
            <div className='ButtonRow'>
                <form onClick={this.onSubmit}>
                    
                    <input placeholder='Company'></input>
                    <input placeholder='long or short?'></input>
                    <button>Add Position</button>
                </form>
                
            </div>
        </div>
        );
      }
}

export default StockGrid;