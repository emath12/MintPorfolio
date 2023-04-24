import './Home.css'
import axios from "axios"
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import useToken from "../auth/useToken";

import logo from "../user/small_logo_with_text.png"

function Header(props) {
    const nav = useNavigate();

    const { token, removeToken, setToken } = useToken();

    function navSelect () {
        nav("/select");
    }

    function navHome () {
        nav("/");
    }
    
    function navProfile() {
        nav("/profile")
    }

    function navPortfolio() {
        nav("/returns")
    }

    function navCreateAccount() {
        nav("/create-account")
    }

    function navLogin() {
        nav("/login")
    }

    function navLogout() {

        removeToken()

        axios.post('http://127.0.0.1:5000/logout', [])
            .then(response => console.log(response))
            .then(error => console.log(error));
            nav('/');
            window.location.reload();
    }



    return (
        <>
        <Navbar style={{boxShadow: "0px 2px 4px 0px rgba(0,0,0,.2"}}>
          <Container>
            <Navbar.Brand onClick={navHome} >
                <Image src={logo} alt="Logo"/>
            </Navbar.Brand>

            <Nav>
                <Nav.Link onClick={navSelect}>Build Portfolio</Nav.Link>
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
                      <NavDropdown.Item onClick={navCreateAccount}>Create Account</NavDropdown.Item>
                      <NavDropdown.Item onClick={navLogin}>Login</NavDropdown.Item>
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