import './PortfolioReturns.css';
import React from "react"
import Graph from './Graph.js';
import OurBar from './OurBar.js';
import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';

function PortfolioReturns() {
    return (
        <>
            <OurBar />
            <div className="Home">
                <div className="Title">
                    <h1>
                        Portfolio Returns
                    </h1>
                </div>
                <Graph />
            </div>
        </>
        
    );

}

export default PortfolioReturns