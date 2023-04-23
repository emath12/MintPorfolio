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

    function updatePortfolio() {
          axios.post('http://127.0.0.1:5000/update_portfolio', {}, {
              headers: {
                Authorization: 'Bearer ' + props.token
              }
            })
            .then(response => {
              // handle the response
            })
            .catch(error => {
              console.log(error)
            });
    }


    return (
        <>
        <Navbar >
          <Container>
            <Navbar.Brand onClick={navHome} >Mint Portfolio</Navbar.Brand>

            <Nav>
                <Nav.Link onClick={navSelect}>Build Porfolio</Nav.Link>
                <Nav.Link onClick={navPortfolio}>View Portfolio</Nav.Link>
                <Nav.Link onClick={updatePortfolio}>Update</Nav.Link>
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