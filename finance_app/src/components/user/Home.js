import './Home.css'

import React, { useState, useEffect, useRef } from 'react';

import Footer from './Footer.js'
import Header from './Header.js'

function Home() {
    return (
        <>
            <div className={'HomePage'}>

                <Header />

                <div className={'left-center'}>
                    <strong><h2>
                        Your center for calculating your <br/> personal financial portfolio's
                        performance.
                    </h2></strong>
                    <br/>
                    <p>Become a better investor, one ticker at a time.</p>
                    <br/>
                </div>

                <div className={'right-center'}>
                    <h2>
                        The power of the financial industry, <br/> in the palm of your hand.
                    </h2>
                    <p>Get your money up</p>
                </div>

                <div className={'left-center'}>
                    <strong><h2>
                        Our state-of-the-art tools will allow <br/> you the financial freedom
                        that you desire.
                    </h2></strong>
                    <br/>
                    <p>Become a better investor, one ticker at a time.</p>
                    <br/>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Home; 