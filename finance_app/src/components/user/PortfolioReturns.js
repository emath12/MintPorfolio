import './PortfolioReturns.css';
import React from "react"
import Graph from './Graph.js';
import Header from './Header.js';

function PortfolioReturns() {
    return (
        <>
            <Header />
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