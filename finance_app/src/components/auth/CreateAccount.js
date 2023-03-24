
import './Auth.css'

import OurBar from "../user/OurBar"
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';


function CreateAccount() {

    const nav = useNavigate();

    const [pass, setPass] = useState("");
    const [passconfirm, setPassConfirm] = useState("");
    const [equal, setEqual] = useState(undefined);

    function handleClick() {
        if (pass != passconfirm) {
            setEqual(false)
        } else {
            setEqual(true)
        }
    }

    useEffect(() => {
        if (equal) {
            
            // dump [username, password]

            nav('/select');
        }
        
    }, [equal])
    
    return (
        <>
        <OurBar />
        <div className="center">
            <div>
                <h1>Create Account</h1>
                <input placeholder="Username"></input>
                <br></br>
                <br></br>
                <input onChange={e => setPass(e.target.value)} placeholder="Enter Password"></input>
                <br></br>
                <input onChange={e => setPassConfirm(e.target.value)} placeholder="Enter Password Again"></input>
                <br></br>
                <button onClick={handleClick}>Submit</button>
                {
                    equal === false && 
                    <p style={{color: 'red'}}>Passwords don't match!</p>
                }
            </div>  
        </div>
        
        </>
    )
}

export default CreateAccount