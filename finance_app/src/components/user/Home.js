import './Home.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

import OurBar from './OurBar.js'

function Home() {
    return (
        <div className='HomePage'>
            <OurBar />
            <div className='Split'>
                <div className='Name'>
                    <h1>Portfolio Builder</h1>
                </div>
                <div>
                    <h2>Obama</h2>
                </div>
            </div>
        </div>
    )
}

export default Home; 