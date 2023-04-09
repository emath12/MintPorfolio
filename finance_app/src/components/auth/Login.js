import "./Auth.css"
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Header from "../user/Header";

function Login() {

    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleClick() {

        // dump the [username, password]

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