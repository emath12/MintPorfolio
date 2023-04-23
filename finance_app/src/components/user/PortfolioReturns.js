import './PortfolioReturns.css';
import React from "react"
import Graph from './Graph.js';
import Header from './Header.js';
import Footer from './Footer.js'

function PortfolioReturns(props) {
    return (
        <>
            <div className='ReturnsPage'>
                <Header />
                <div className="Home">
                    <div className="Title">
                        <h1>
                            Portfolio Returns
                        </h1>
                    </div>
                </div>
                <Graph
                    token={props.token}
                />
            </div>
        </>
    );
}

export default PortfolioReturns