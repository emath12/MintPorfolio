// import OurBar and have it display on our page.

// these are all the other imports you should need:
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
        {"AAPL": 10}, 
        {"MSFT": 10}, 
        {"AMZN": 10}, 
        {"NVDA": 10}, 
        {"BRK-B": 10}
    ]
}

const PositionCard = (/* receive the information from the profile */) => {
    
    return (
        <>
        {/* display the information in a nice way*/}
        </>
    )
    
}

function ProfilePage() {

    // const [] = ()
    // define a react hook whose state is a struct with the current user information
    // and an array of tickers name and share tuples

    return (
        <>
            {/* Display the OurBar Component*/}
            {/* 
            
            Map through the state of the ProfilePage and display PositionCard that have certain
            types of info
            */}
            <button>Add or Edit Positions</button>
            {/* have this button navigate back to the page where you can add positions when clicked*/}
        </>
    )
}



export default ProfilePage