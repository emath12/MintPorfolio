import './StockGrid.css';
import React, { Component } from 'react';

const StockRow = props => {
    <div className="StockRow">
        <input placeholder='StockRow'></input>
        <input  placeholder='Long or short?'></input>
        <input placeholder='# of Shares'></input>
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

      this.state = {
        objects : [],
        // state will just be an array of stockRowObjects
        // empty to start. This is the state's initial state
      }
    }

    createNewBlankPosition = () => {
        // some how manipulate the state once the button is clicked, perhaps?

        // rememember that you need to use setState()

        // this.setState(
        //     // something
        // )

        this.setState({
            objects : this.state.objects.push("hello")
        })
    }

    onSubmit = event => { 
        // when the form itself is finished being created.

        // iteate 
        
        // do some research on how to pull from the <form>, there's tons of
        // documentation on this on the interwebs.

  
    }

    render() {
        return (
        // triggers the onSubmit event handler
        <form onSubmit={this.onSubmit}>
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
            <div className="Stocks">
                <StockRow/>
                <StockRow/>
            </div>
            
            <div className='ButtonRow'>
                <button onClick={this.createNewBlankPosition()}>Add Position</button>            
            </div>
        </form>
        );
      }
}

export default StockGrid;