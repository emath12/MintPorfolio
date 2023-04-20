import './Home.css'
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer.js'
import Header from './Header.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col, Image, Button, Card} from 'react-bootstrap'


function Home() {
    const nav = useNavigate();

    function navLogin () {
        nav("/login");
    }

    return (
        <>
            <div className={'HomePage'}>

                <Header />
                <main>
                    <Container>
                    <Row className="px-4 my-5">
                        <Col sm={7}>
                        <Image 
                            src="https://cdn.vox-cdn.com/thumbor/elu3ZET3BhThJseL405rhiLBosQ=/0x0:3000x2380/1200x800/filters:focal(849x819:1329x1299)/cdn.vox-cdn.com/uploads/chorus_image/image/65776027/ezra_stoller_heller_house.0.jpg"
                            fluid 
                            rounded />
                        </Col>
                        <Col sm={5}>
                            <h1 class="font-weigh-light">Welcome to Mint Portfolio.</h1>    
                            <p class="mt-4"> We are your center for calculating your personal financial portfolio's performance. Become a better investor, one ticker at a time.</p>
                            <Button variant="outline-primary" href = '/login'> Get Started</Button>
                        </Col>

                    </Row>
                    <Row className="my-5">
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                
                                <Card.Body>
                                    <Card.Title>Build</Card.Title>
                                    <Card.Text>
                                    Build and maintain your portfolio by inputting the stock tickers, number of shares, and dates of all of your past purchases. We take care of the rest.
                                    </Card.Text>
                                <Card.Img variant="bottom" src="data:image/jpeg;base64,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" />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                
                                <Card.Body>
                                    <Card.Title>Track</Card.Title>
                                    <Card.Text>
                                    Understand your portfolio's performance with personalized and up-to-date financial metrics and beautiful graphs.
                                    </Card.Text>
                                <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw53-kyslIL1K7d-tkMEiWwYU4MdxHeSJZ6cevaMHAug&usqp=CAU&ec=48665701" />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                
                                <Card.Body>
                                    <Card.Title >Refine</Card.Title>
                                    <Card.Text>
                                    Our state-of-the-art tools will allow you the financial insights and freedom required to strategically grow your holdings.
                                    </Card.Text>
                                <Card.Img variant="top" src="https://www.yankodesign.com/images/design_news/2022/12/scalar-architecture-cabin/scalar_architecture_metal_cabin_yanko_design_03.jpg" />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    </Container>
                </main>
                <div className="FooterParent">
                    <Footer class="Footer"></Footer>
                </div>
            </div>
        </>)
}

export default Home; 