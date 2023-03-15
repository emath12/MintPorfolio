import './StockGrid.css';
import React, { Component } from 'react';


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

        return (
          <div className="StockRow" key={id}>
            <input placeholder="StockRow"></input>
            <input placeholder="Long or short?"></input>
            <input placeholder="# of Shares"></input>
            <button onClick={removeItem}>Delete</button>
          </div>
        );
      }

    createNewBlankPosition = () => {
        // some how manipulate the state once the button is clicked, perhaps?

        // rememember that you need to use setState()

        let newState = this.state.objects.concat(
            {id: this.state.size}
        );
        
        this.setState({
            objects : newState,
            size: this.state.size + 1
        });

        console.log(this.state.objects);
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
            </div>
        )
      }
}

export default StockGrid;