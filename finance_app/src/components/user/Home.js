import './Home.css'
import {useNavigate} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer.js'
import Header from './Header.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col, Image, Button, Card} from 'react-bootstrap'


function Home(props) {
    return (
        <>
            <div className={'HomePage'}>
                <Header
                    token={props.token}
                />
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
                                    <Card.Title style={{textAlign: 'center'}}>Build</Card.Title>
                                    <Card.Text>
                                    Build and maintain your portfolio by inputting the stock tickers, number of shares, and dates of all of your past purchases. We take care of the rest.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                
                                <Card.Body>
                                    <Card.Title style={{textAlign: 'center'}}>Track</Card.Title>
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
                                    <Card.Title style={{textAlign: 'center'}}>Refine</Card.Title>
                                    <Card.Text>
                                    Our state-of-the-art tools will provide you with the financial insights required to strategically grow your holdings.
                                    </Card.Text>
                                <Card.Img variant="top" src="https://cdn.homedit.com/wp-content/uploads/2020/03/Villas-Jonc-Swiss-Christian-von-D%C3%BCring-design.jpg" />
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