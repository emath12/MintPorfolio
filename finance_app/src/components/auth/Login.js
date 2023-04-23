import './Login.css'
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Header from "../user/Header";
import Footer from "../user/Footer"
import axios from "axios";

function Login(props) {

    const [loginForm, setloginForm] = useState({
      username: "",
      password: ""
    })

    function logMeIn(event) {
      axios ({
            method: "POST",
            url:"http://127.0.0.1:5000/login",
            data: {
                  username: loginForm.username,
                  password: loginForm.password
            }
      }).then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })

      setloginForm(({
        username: "",
        password: ""}))

      event.preventDefault()
    }

    function handleChange(event) {
      const {value, name} = event.target

      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
        <h1>Login</h1>
          <form className="login">
            <input onChange={handleChange}
                  text={loginForm.username}
                  name="username"
                  placeholder="Username"
                  value={loginForm.username} />
            <input onChange={handleChange}
                  type="password"
                  text={loginForm.password}
                  name="password"
                  placeholder="Password"
                  value={loginForm.password} />

          <button onClick={logMeIn}>Submit</button>
        </form>
      </div>
    );
}

export default Login;