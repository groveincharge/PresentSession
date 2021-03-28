import React from 'react';
import {Link} from 'react-router-dom';
import './../css/Nav.css';

export const  Nav = () => {
  return (
    <nav className='menu-nav'>
    <h3>NAD (757) 581-9156</h3>
       <div className='spacer'/>
      <ul className= 'nav-links' > 

      <Link to='./HomePage'>
        <li>Home</li>
        </Link>

        <Link to='./About'>
        <li>About</li>
        </Link>

        <Link to='./Contact'>
        <li>Contact</li>
        </Link> 

        <Link to='./ServicePage'>
        <li>Services</li>
        </Link>
       
       <Link to='./ProductPage'>
        <li>Products</li>
        </Link>

        <Link to="./Intro">
         <li><i className="fas fa-shopping-cart">shopping_cart</i></li>
          </Link>
        
      </ul>
    </nav>
  );
}