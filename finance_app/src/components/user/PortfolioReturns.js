import './PortfolioReturns.css';
import React from "react"
import Graph from './Graph.js';
import Header from './Header.js';
import Footer from './Footer.js'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';

function PortfolioReturns(props) {
    return (
        <>
            {
                !props.token && <Alert severity="warning">You don't have any positions! Go to Build Portfolio</Alert>

            }
            <div className='ReturnsPage'>
                <Header
                    token={props.token}
                />
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