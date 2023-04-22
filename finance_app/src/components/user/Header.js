import './Home.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios"

import { useNavigate } from 'react-router-dom';
import React from 'react';


function Header(props) {
    const nav = useNavigate();

    function navSelect () {
        nav("/select");
    }

    function navHome () {
        nav("/");
    }
    
    function navProfile() {

        axios.get('http://127.0.0.1:5000/logged_in_check')

            .then(response => {
                if (response.data.logged_in) {
                    nav("/profile")
                } else {
                    nav("/create-account")
                }
            })

            .then(error => {
                console.log(error)
                console.log("erroeed")

            });
    }

    function navGettingStarted() {
        nav("/")
    }

    function navPortfolio() {
        nav("/returns")
    }

    return (
        <>
        <Navbar >
          <Container>
            <Navbar.Brand onClick={navHome} >PortfolioBuilder</Navbar.Brand>

            <Nav>
                <Nav.Link onClick={navGettingStarted}>How to Use</Nav.Link>
                <Nav.Link onClick={navSelect}>Build Porfolio</Nav.Link>
                <Nav.Link onClick={navPortfolio}>View Portfolio</Nav.Link>
            </Nav>

            <Nav> 
                <Nav.Link onClick={navProfile}>Account</Nav.Link>
            </Nav>
        
          </Container>
        </Navbar>
        <br></br>
        </>
      );
}

export default Header;