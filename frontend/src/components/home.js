import {Jumbotron, Container, Row, Col, Image, Button} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import Register from './register';
import Login from './login';
import './css/home.css';

const Home = () => {

    return ( 
        <div>
            <Container>
                <Jumbotron>
                <h1>Welcome to Norfolk Auto Detail</h1>
                <h2>(757) 581-9156</h2>
                 <p>Norfolkautodetail.com is the place to come to for
                    all of your Auto detail needs, from products to services.
                    Quality is the core motto of our organization, we are available 
                    to our customers year round.
                 </p>
                </Jumbotron>
                <div className = "Home">
                <Register/>
                <Login/>
                </div>
            </Container>
        </div>
     );
}
 
export default Home;