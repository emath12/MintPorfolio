import "./Auth.css"
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import OurBar from "../user/OurBar";

function Login() {

    const nav = useNavigate();

    function handleClick() {
        nav('/select');
    }

    return (
        <>
        <OurBar />
        <div className="center">
            <div>
                <h1>Login</h1>
                <input placeholder="Username"></input>
                <br></br>
                <br></br>
                <input placeholder="Password"></input>
                <br></br>
                <button onClick={handleClick}>Submit</button>
            </div>
        </div>
        </>
    )
}

export default Login;