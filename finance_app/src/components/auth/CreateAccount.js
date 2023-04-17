
import './Auth.css'

import Header from "../user/Header"
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect} from 'react';
import axios from 'axios';


function CreateAccount() {

    const nav = useNavigate();

    const [username, setUsername] = useState("");
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
            
            axios.post('http://127.0.0.1:5000/sign-up', [username, pass])
            .then(response => console.log(response))
            .then(error => console.log(error));

            nav('/login');
        }
        
    }, [equal])
    
    return (
        <>
            <Header />
            <div className="center">
                <div>
                    <h1>Create Account</h1>
                    <input onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
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