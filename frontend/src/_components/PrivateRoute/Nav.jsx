import React from 'react';
import {Link} from 'react-router-dom';
import './../css/Nav.css';

export const  Nav = () => {
  return (
    <nav className='menu-nav'>
    <h3>NAD (757) 581-9156</h3>
       <div className='spacer'/>
      <ul className= 'nav-links' > 

      <Link to='/'>
        <li>Home</li>
        </Link>

        <Link to='/about'>
        <li>About</li>
        </Link>

        <Link to='/contact'>
        <li>Contact</li>
        </Link> 

        <Link to='/service'>
        <li>Services</li>
        </Link>
       
       <Link to='/product'>
        <li>Products</li>
        </Link>

        <Link to='/logout'>
        <li>logout</li>
        </Link>

        <Link to="/cart">
         <li><i className="fas fa-shopping-cart">cart</i></li>
          </Link>
        
      </ul>
    </nav>
  );
}