import './StockGrid.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import OurBar from './OurBar.js'

function StockRow(props) {

  const [company, setCompany] = useState("");
  const [shares, setShares] = useState(0);
  const [rows, setRows] = props.rows;

  const prevCompany = useRef(company);
  const prevShares = useRef(shares);

  const id = props.id;

  function removeItem() {
      const newState = rows.objects.filter(item => item.id !== id);
    
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
    <div className="StockRow" key={id}>
      <input 
          value={company} 
          type="text" 
          onChange={updateCompanyValue} 
          placeholder="Ticker">
      </input>
      <input 
          onChange={updateShareAmount} 
          placeholder="# of Shares">    
      </input>
      <button className="deleteButton"
          onClick={removeItem}>
          Delete
      </button>
    </div>
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
        axios.post('http://127.0.0.1:5000/input_data', [rows.objects, date])
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
              <div className='ButtonRow'>
                  <button className="toggle" onClick={createNewBlankPosition}>Add Position</button>            
              </div>
              <button className="toggle" type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </>
    )

}

export default StockGrid;