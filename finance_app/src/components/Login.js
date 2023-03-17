import "./Auth.css"
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';

function Login() {

    const nav = useNavigate();

    function handleClick() {
        nav('/select');
    }

    return (
        <div>
            <input placeholder="Username"></input>
            <br></br>
            <input placeholder="Password"></input>
            <br></br>
            <button onClick={handleClick}>Submit</button>
        </div>
    )
}

export default Login;