import './StockGrid.css';
import { myVariable } from './Options.js';
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import {Container} from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from './Header.js'
import Footer from './Footer.js'

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

  function TickerSelectButton() {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    function updateCompany (selectedOption) {
      setCompany(selectedOption);
    }
  
    return (
      <div className="TickerSelect">
        <Select
          value={company}
          onChange={updateCompany}
          className="basic-single"
          classNamePrefix="select"
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="ticker"
          // TO DO: IMPORT FILE CONTAINING ALL TICKER VALUES and reset options
          options={myVariable}
        />
      </div>
    );
  }
  

  useEffect(() => {
    // https://stackoverflow.com/questions/53446020/how-to-compare-oldvalues-and-newvalues-on-react-hooks-useeffect
    if (prevCompany.current != company || prevShares.current !== shares) {
      props.doUpdate(id, company, shares);
      prevCompany.current = company;
      prevShares.current = shares;
    }
  }, [company, shares]);

  function updateShareAmount(event) {
      setShares(event.target.value);
  }

  return (
    <>
        <div className="StockRow" key={id}>
            <TickerSelectButton />

            <input
                type={"number"} 
                min={"0"}
                style={{ height: 38}}
                pattern={"[0-9]*"}
                value={shares}
                name={"Number of Shares"}
                onChange={updateShareAmount}
                placeholder={"# of Shares"}
            />

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
            updatedRows[i].company = company.label;
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
        console.log("data submitted!");
        console.log([rows.objects, date]);

          axios.post('http://127.0.0.1:5000/current_portfolio', [rows.objects, date],
          {
            headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000',
            }
          })
          .then(response => console.log(response))
          .then(error => console.log(error));

        nav('/returns');

        window.location.reload(false);
    };

    return (
      <>
        <div className="SelectPage">
          <div className="center">
            <div className="page">
              <Header />
              <br></br>
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
                  }</div>
              <br></br>
              
              <Container>
              <div className='ButtonRow'>
                <p className="date">Purchase date: 
                <input
                  className='date'
                  onChange={updateDate}
                  inline="True"
                  placeholder="Construction Date"
                  type="date"
                /> 
                </p>
                  <button className="toggleAdd" onClick={createNewBlankPosition}>Add Position</button>            
              </div>
              <button className="toggleSubmit" type="submit" onClick={handleSubmit}>Submit</button>
              </Container>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="Footer Parent">
              <Footer class="Footer"></Footer>
            </div>
          </div>
        </div>
      </>
    )
}

export default StockGrid
