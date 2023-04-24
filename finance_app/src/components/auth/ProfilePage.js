import './ProfilePage.css';
import React, { useState, useEffect, useRef } from 'react';
import {Link, NavLink, useNavigate } from 'react-router-dom';
import Header from '../user/Header.js';
import Footer from '../user/Footer.js'
import Card from 'react-bootstrap/Card';
import axios from "axios";

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
    username : "Build your portfolio, then come back!",
    positions : [

    ]
}

const PositionCard = (props) => {

    const nav = useNavigate();

    return (
        <div className="card w-auto">
            <Card style={{ width: '18rpm' }}>
            <Card.Header>
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
            </Card.Body>
        </Card>
        </div>
    );
    
}

function ProfilePage(props) {

    const nav = useNavigate();

    const [profile, setProfile] = useState(testUser);
    
    const navBuildPorfolio = () => {
        nav("/select");

    }

    useEffect(() => {
        axios({
      method: "GET",
      url:"http://127.0.0.1:5000/get_user",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
        response.data.username = response.data.username + "'s Profile"
        setProfile(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }, []);
    
    return (
        <>
            {props.token && (
            <div className="ProfilePage">
                <Header
                    token={props.token}
                />
                
                    <div className='Top'>
                        <h1 className='Username'> 
                            <u>{profile.username}</u>
                        </h1>
                        <button className="AddButton" onClick={navBuildPorfolio}>Add or Edit Positions</button>

                    </div>
                    <div className='Positions'>
                        {
                            profile.positions.map((position) => 
                            {
                                return <PositionCard
                                    ticker={position[0]}
                                    numShares={position[1]}
                                />
                            })
                        }
                    </div>
                    <br></br>
            </div>
            )}
        </>
    );
}


export default ProfilePage