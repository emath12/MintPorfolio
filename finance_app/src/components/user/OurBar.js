import './Home.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';


function OurBar(props) {
    const nav = useNavigate();

    function navSelect () {
        nav("/select");
    }

    function navHome () {
        nav("/");
    }
    
    function navProfile() {
        nav("/profile")
    }

    function navGettingStarted() {
        nav("/getting-started")
    }

    // TODO : fix the left align, dunno why its not working

    return (
        <>
        <Navbar>
          <Container>
            <Navbar.Brand>PortfolioBuilder</Navbar.Brand>

            <Nav>
                <Nav.Link onClick={navHome}>Home</Nav.Link>
                <Nav.Link onClick={navSelect}>Build Porfolio</Nav.Link>
                <Nav.Link onClick={navGettingStarted}>How to Use</Nav.Link>
            </Nav>

            <Nav> 
                <Nav.Link onclick={navProfile}>Account</Nav.Link>
            </Nav>
        
          </Container>
        </Navbar>
        <br></br>
        </>
      );
}

export default OurBar;