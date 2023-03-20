import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OurBar from '../user/OurBar.js'
// access this export at /profile on the localhost 

// TODO : DISPLAY THE POSITIONS HELD BY A PARTICULAR USER. Work on branch ProfileFrontend

// BETA FUTURE PLANS
// - Able to edit posiitons right here?
// - 

// we will use dummy data for now, in the future, we will have to fetch this data, but Taimur hasn't finished
// auth db yet.

// imagine we have fetched this data. Now, display the positions held by this user.
const testUser = {
    username : "investorJoe", 
    positions : [
        ["AAPL", 10], 
        ["MSFT", 10], 
        ["AMZN", 10], 
        ["NVDA", 10], 
        ["BRK-B", 10]
    ]
}

const PositionCard = (props) => {
    return (
        <div>
            <h2 className='ticker'>{props.ticker}</h2>
            <h3 className='numShares'>{props.numShares}</h3>
            <p>"Hi</p>
        </div>
    );
    
}

function ProfilePage() {

    const nav = useNavigate();

    const [profile, setProfile] = useState({
        username : "investorJoe", 
        positions : [
            ["AAPL", 1], 
            ["MSFT", 2], 
            ["AMZN", 3], 
            ["NVDA", 4], 
            ["BRK-B", 10]
        ]
    })

    // now inform child component what to do 
    // each pos card has ticker + #
    // testUser

    // define a react hook whose state is a struct with the current user information
    // and an array of tickers name and share tuples

    // job of profile is to tell the cards how they should display and how many to display
    // should rely on state to do this
    // use .map()!! 
    
    return (
        <>
            <div>
                <OurBar />
                {
                    profile.positions.map((position) => 
                    {console.log(profile.positions);
                        <PositionCard
                            ticker={position[0][0]}
                            numShares={position[0][1]}
                        />
                    })
                }
            </div>
            <button>Add or Edit Positions</button>
            {/* have this button navigate back to the page where you can add positions when clicked*/}
        </>
    );
}


export default ProfilePage