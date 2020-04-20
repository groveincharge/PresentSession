import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';

export const Intro = () => {
  return (
    <div className="Home">
      <Container>
        <Jumbotron>
          <h1>Professional Auto Detailing</h1>
          <h2>(757) 581-9156</h2>
          <p>Norfolkautodetail.com is the place to come to for
            all of your Auto detail needs, from products to services.
             Quality is the core motto of our organization, we are available
             to our customers year round.
            </p>
          <Link to="/products">
            <Button bsstyle="primary">About</Button>
          </Link>
        </Jumbotron>
      </Container>
    </div>
  )
}