import './Login.css'
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Header from "../user/Header";
import Footer from "../user/Footer"
import axios from "axios";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';


function Login(props) {

    let nav = useNavigate()

    const [loginForm, setloginForm] = useState({
      username: "",
      password: ""
    })
    const [error, setError] = useState({
        "active" : false,
        "message" : ""
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
          if (response.data.type == "error") {
              setError({
                  "active" : true,
                  "message" : response.data.message
              })
          } else {
              props.setToken(response.data.access_token)
                nav("/select")
          }

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
          <Header />
          <h1>Login</h1>
          <center>
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
          </center>
           <Snackbar open={error.active} autoHideDuration={6000}>
       <Alert severity="error">
         <AlertTitle>{error.message}</AlertTitle>
       </Alert>
 </Snackbar>
      </div>
    );
}

export default Login;

// // https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7

