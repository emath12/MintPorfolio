import './Home.css';
import React from "react"
import Graph from './Graph.js';
;

function Home() {
    return (
        <div className="Home">
            <div className="Title">
                <h1>
                    Portfolio Returns
                </h1>
            </div>
            <Graph/>
        </div>
        
    );

}

export default Home 