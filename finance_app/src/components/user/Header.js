import './Home.css'
import axios from "axios"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import useToken from "../auth/useToken";



function Header(props) {
    const nav = useNavigate();

    const { token, removeToken, setToken } = useToken();


    const [loggedIn, setloggedIn] = useState(false)

    function navSelect () {
        nav("/select");
    }

    function navHome () {
        nav("/");
    }
    
    function navProfile() {

        axios.get('http://127.0.0.1:5000/profile')

            .then(response => {
                if (response.data.logged_in) {
                    nav("/profile")
                } else {
                    nav("/create-account")
                }
            })

            .then(error => {
                nav("/create-account")
                console.log(error)
                console.log("erroeed")

            });
    }

    function navPortfolio() {
        nav("/returns")
    }

    function navLogout() {

        removeToken()

        axios.post('http://127.0.0.1:5000/logout', [])
            .then(response => console.log(response))
            .then(error => console.log(error));

            nav('/');
    }



    return (
        <>
        <Navbar >
          <Container>
            <Navbar.Brand onClick={navHome} >MintPortfolio</Navbar.Brand>

            <Nav>
                <Nav.Link onClick={navSelect}>Build Porfolio</Nav.Link>
                <Nav.Link onClick={navPortfolio}>View Portfolio</Nav.Link>
            </Nav>

            <NavDropdown title="Account">
                  {props.token ? (
                    <>
                      <NavDropdown.Item onClick={navProfile}>Profile</NavDropdown.Item>
                      <NavDropdown.Item onClick={navLogout}>Logout</NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item onClick={navProfile}>Create Account</NavDropdown.Item>
                      <NavDropdown.Item onClick={navProfile}>Login</NavDropdown.Item>
                    </>
                  )}
            </NavDropdown>
        
          </Container>
        </Navbar>
        <br></br>
        </>
      );
}

export default Header;