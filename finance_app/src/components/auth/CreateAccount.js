
import './Auth.css'

import Header from "../user/Header"
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import FlashMessage from 'react-flash-message'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';

function CreateAccount(props) {

    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [passconfirm, setPassConfirm] = useState("");
    const [equal, setEqual] = useState(undefined);
    const [message, setMessage] = useState(false)
    const [error, setError] = useState({
        "active" : false,
        "message" : ""
    })

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
            .then(response => {
                if (response.data.type == "success") {
                    setMessage(true)
                    props.setToken(response.data.access_token)
                } else if (response.data.type == "error") {
                    setError({
                        "active" : true,
                        "message" : response.data.message
                    })
                }
            })
            .then(error => console.log(error));
        }
        
    }, [equal])
    
    return (
        <>
            <Header
                token={props.token}
            />
            <div className="center">
                <form>
                    <h1>Create Account</h1>
                    <input onChange={e => setUsername(e.target.value)} placeholder="Username"></input>
                    <br></br>
                    <br></br>
                    <input onChange={e => setPass(e.target.value)} placeholder="Enter Password"></input>
                    <br></br>
                    <input onChange={e => setPassConfirm(e.target.value)} placeholder="Enter Password Again"></input>
                    <br></br>
                    <button type={"button"} onClick={handleClick}>Submit</button>
                    {
                        equal === false &&
                        <p style={{color: 'red'}}>Passwords don't match!</p>
                    }
                   
                </form>

                <div>

                  <Snackbar open={message} autoHideDuration={6000}>
                        <Alert severity="success">
                          <AlertTitle>Account Created!</AlertTitle>
                        </Alert>
                  </Snackbar>

                  <Snackbar open={error.active} autoHideDuration={6000}>
                        <Alert severity="error">
                          <AlertTitle>{error.message}</AlertTitle>
                        </Alert>
                  </Snackbar>
                </div>
            </div>

        </>
    )
}

export default CreateAccount