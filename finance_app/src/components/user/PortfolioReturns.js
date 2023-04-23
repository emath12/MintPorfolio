import './PortfolioReturns.css';
import React from "react"
import Graph from './Graph.js';
import Header from './Header.js';

function PortfolioReturns(props) {
    return (
        <>
            <Header />
            <div className="Home">
                <div className="Title">
                    <h1>
                        Portfolio Returns
                    </h1>
                </div>
                <Graph
                    token={props.token}
                />
            </div>
        </>
    );
}

export default PortfolioReturns