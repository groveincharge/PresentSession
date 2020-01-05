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
          <Row className="show-container text-center" >
            <Col xs={12} sm={4} className="person-wrapper">
            <Image src={'/uploads/vehicle4.JPG'} className="profile-pic" width="30%" rounded/>
            <h3>Interior</h3>
            <p>Professional auto detailing from the people at Norfolkautodetail.com.
              Come and experience the difference.
            </p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src={'/uploads/vehicle4.JPG'} className="profile-pic" width="30%" rounded/>
            <h3>Exterior</h3>
            <p>Professional auto detailing from the people at Norfolkautodetail.com.
              Come and experience the difference.
            </p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src={'/uploads/vehicle4.JPG'} className="profile-pic" width="30%" rounded/>
            <h3>Engine</h3>
            <p>Professional auto detailing from the people at Norfolkautodetail.com.
              Come and experience the difference.
            </p>
          </Col>
           </Row>
                <div className = "Home">
                <Register/>
                <Login/>
                </div>
            </Container>
        </div>
     );
}
 
export default Home;