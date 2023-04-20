import './PortfolioReturns.css';
import React from "react"
import Graph from './Graph.js';
import Header from './Header.js';
import Footer from './Footer.js'

function PortfolioReturns() {
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
                    <Graph />
                </div>
                <Footer></Footer>
            </div>
        </>
    );
}

export default PortfolioReturns