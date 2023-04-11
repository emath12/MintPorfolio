import "./Auth.css"
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Header from "../user/Header";
import axios from "axios";

function Login() {

    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleClick() {

        axios.post('http://127.0.0.1:5000/login', [username, password])
            .then(response => console.log(response))
            .then(error => console.log(error));

            nav('/select');
    }

    return (
        <>
        <Header />
        <div className="center">
            <div>
                <h1>Login</h1>
                <input onClick={e => setUsername(e.target.value)} placeholder="Username"></input>
                <br></br>
                <br></br>
                <input onClick={e => setPassword(e.target.value)} placeholder="Password"></input>
                <br></br>
                <button onClick={handleClick}>Submit</button>
            </div>
        </div>
        </>
    )
}

export default Login;