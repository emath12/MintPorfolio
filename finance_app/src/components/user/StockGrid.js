import './StockGrid.css';
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import OurBar from './OurBar.js'

function StockGridHeader() {
  return (
    <div className="StockRow">
      <label className="TickerSelect">
        Ticker
      </label>
      <label className= "TickerSelect">
        # of shares
      </label>
    </div>
  );
}

function TickerSelectButton() {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <div className="TickerSelect">
      <Select
        className="basic-single"
        classNamePrefix="select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="ticker"
        // TO DO: IMPORT FILE CONTAINING ALL TICKER VALUES and reset options
        options={[{value : "aapl", label : "AAPL"}, 
                  {value : "msft", label : "MSFT"}, 
                  {value : "amzn", label : "AMZN"}, 
                  {value : "nvda", label : "NVDA"},
                  {value : "brk-b", label : "BRK-B"}]}
      />
    </div>
  );
}

function NumberInputButton() {
  return (
    <input 
      type="number" min="0"
      style={{ height: 38}}
      pattern="[0-9]*"
      value={shares}
      name="Number of Shares"
      onChange={updateShareAmount}
      placeholder="# of Shares">    
  </input>
  )
}

function StockRow(props) {

  const [company, setCompany] = useState("");
  const [shares, setShares] = useState(0);
  const [rows, setRows] = props.rows;

  const prevCompany = useRef(company);
  const prevShares = useRef(shares);

  const id = props.id;

  function removeItem() {
    
      const newState = rows.objects.filter(item => 
          item.id !== id
      );
    
      setRows({
        objects: newState,
        size : rows.size + 1
      });

  };

  useEffect(() => {
    // https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
    if (prevCompany.current != company || prevShares.current !== shares) {
      props.doUpdate(id, company, shares);
      prevCompany.current = company;
      prevShares.current = shares;
    }
  }, [company, shares]);

  function updateCompanyValue(event) {
      setCompany(event.target.value);
  }

  function updateShareAmount(event) {
      setShares(event.target.value);
  }


  return (
    <>
    <div className="StockRow" key={id}>
      <TickerSelectButton />
      <NumberInputButton />
        <button className="deleteButton"
            style={{ height: 38}}
            onClick={removeItem}>
            Delete
        </button>
    </div>
    </>
  );
}

function StockGrid() {
    const nav = useNavigate();

    const [rows, setRows] = useState({
      objects : [
        {
          id: 0,
          company : '',
          shares : 0
        }
      ],
      size: 0
    })

    const [date, setDate] = useState("");

    function updateDate(event) {
        setDate(event.target.value);
    }

    function doUpdate(id, company, shares) {
      let updatedRows = rows.objects;

      for (let i = 0; i < updatedRows.length; i++) {
          if (updatedRows[i].id == id) {
            updatedRows[i].company = company;
            updatedRows[i].shares = shares;
          }
      }
      
      setRows({
        objects: updatedRows,
        size: rows.size
      });

    }
   
    function createNewBlankPosition() {
        
        let newState = rows.objects.concat(
            {id: rows.size + 1,
             company : '',
             shares : 0
            }
        );
        
        setRows({
            objects : newState,
            size: rows.size + 1
        });
    };

    function handleSubmit() { 
        console.log("data dubmitted!");

          axios.post('http://127.0.0.1:5000/current_portfolio', [rows.objects, date],
          {
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
          })
          .then(response => console.log(response))
          .then(error => console.log(error));

        nav('/returns')
    };

    return (
        <>
            <div className="page">
              <OurBar />
              <input
                className='date'
                onChange={updateDate}
                placeholder="Construction Date"
                type="date"
              />
              <StockGridHeader />
              <div className="Stocks">
                  {
                      rows.objects.map(({id}) => {
                          return <StockRow 
                              key={id}
                              id={id}
                              doUpdate={doUpdate}
                              rows={[rows, setRows]}
                          />
                      })  
                  }
              </div>
              <br></br>
              <div className='ButtonRow'>
                  <button className="toggleAdd" onClick={createNewBlankPosition}>Add Position</button>            
              </div>
              <button className="toggleSubmit" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </>
    )

}

export default StockGrid
