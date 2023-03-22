import './ProfilePage.css';
import React, { useState, useEffect, useRef } from 'react';
import {Link, NavLink, useNavigate } from 'react-router-dom';
import OurBar from '../user/OurBar.js';
import Card from 'react-bootstrap/Card';

// access this export at /profile on the localhost 

// TODO : DISPLAY THE POSITIONS HELD BY A PARTICULAR USER. Work on branch ProfileFrontend

// BETA FUTURE PLANS
// - Able to edit posiitons right here?
// - card images match associated companies
// - cards contain additional information about holding such as purchase date

// we will use dummy data for now, in the future, we will have to fetch this data, but Taimur hasn't finished
// auth db yet.

// dummy data
const testUser = {
    username : "investorJoe", 
    positions : [
        ["AAPL", 1], 
        ["MSFT", 2], 
        ["AMZN", 3], 
        ["NVDA", 4], 
        ["BRK-B", 10]
    ]
}

const PositionCard = (props) => {

    const nav = useNavigate();

    const navStockInfo = (props) => {
        nav("https://cdn.britannica.com/89/164789-050-D6B5E2C7/Barack-Obama-2012.jpg")
    }

    return (
        <div className="card w-auto">
            <Card style={{ width: '18rpm' }}>
            <Card.Header>
            <Card.Img variant="top" object_fit="cover" height="auto%" src="https://www.davidgutierrez.co.uk/uploads/4/1/0/3/4103332/london-london-photographer-1295_orig.jpg" />
            </Card.Header>
            <Card.Body>
                <Card.Body>
                    <Card.Title>
                        {props.ticker}
                    </Card.Title>
                    <Card.Text>
                    Total shares: {props.numShares}
                    </Card.Text>
                </Card.Body>
                <Link to="https://cdn.britannica.com/89/164789-050-D6B5E2C7/Barack-Obama-2012.jpg">
                    <button className="ExternalButton">Go somewhere</button>
                </Link>
            </Card.Body>
        </Card>
        </div>
    );
    
}

function ProfilePage() {

    const nav = useNavigate();

    const [profile, setProfile] = useState(testUser)
    
    const navBuildPorfolio = (props) => {
        nav("/select");
    }
    
    return (
        <>
            <div className="ProfPage">
                <OurBar />
                    <br></br>
                    <div className='Top'>
                        <h1 className='Username'> 
                            {profile.username}'s Profile
                        </h1>
                        <button className="AddButton" onClick={navBuildPorfolio}>Add or Edit Positions</button>
                    </div>
                    <div className='Positions'>
                        {
                            profile.positions.map((position) => 
                            {return <PositionCard
                                    ticker={position[0]}
                                    numShares={position[1]}
                                />
                            })
                        }
                    </div>
                    <br></br>
            </div>
            {/* have this button navigate back to the page where you can add positions when clicked*/}
        </>
    );
}


export default ProfilePage