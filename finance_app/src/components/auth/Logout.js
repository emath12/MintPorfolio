import "./Auth.css"
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Header from "../user/Header";
import axios from "axios";
import useToken from "./useToken";

function Logout() {

    const { token, removeToken, setToken } = useToken();

    const nav = useNavigate();

    function handleClick() {

        removeToken()

        axios.post('http://127.0.0.1:5000/logout', [])
            .then(response => console.log(response))
            .then(error => console.log(error));

            nav('/');
    }

    return (
        <>
        <Header />
        <div className="center">
            <div>
                <h1>Logout</h1>
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
        </>
    )
}

export default Logout;
