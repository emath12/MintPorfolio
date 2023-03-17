import './PortfolioReturns.css';
import React from "react"
import Graph from './Graph.js';
import StockGrid from './StockGrid.js'
import OurBar from './OurBar.js'

function PortfoilioReturns() {
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

export default PortfoilioReturns 