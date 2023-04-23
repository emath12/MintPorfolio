import './Home.css'
import axios from "axios"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

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

    return (
        <>
        <Navbar >
          <Container>
            <Navbar.Brand onClick={navHome} >MintPortfolio</Navbar.Brand>

            <Nav>
                <Nav.Link onClick={navSelect}>Build Porfolio</Nav.Link>
                <Nav.Link onClick={navPortfolio}>View Portfolio</Nav.Link>
            </Nav>

            <NavDropdown title="{}">
                  <NavDropdown.Item onClick={navProfile}>Account</NavDropdown.Item>
                  <NavDropdown.Item>Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item >Help</NavDropdown.Item>
            </NavDropdown>
        
          </Container>
        </Navbar>
        <br></br>
        </>
      );
}

export default Header;