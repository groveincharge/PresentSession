import React from 'react';
import {Link} from 'react-router-dom';

export const  VehicleNav = () => {
  return (
    <nav className='menu-nav'>
       <div className='spacer'/>
      <ul className= 'nav-links' > 

       <Link to='/service/cars'>
        <li>Cars</li>
        </Link>

        <Link to='/service/jeeps'>
        <li>Jeeps</li>
        </Link>

        <Link to='/service/suvs'>
        <li>Suvs</li>
        </Link> 
       
       <Link to='/service/pickups'>
        <li>Pickups</li>
        </Link>

         <Link to='/service/minivans'>
        <li>Minivans</li>
        </Link>
        
      </ul>
    </nav>
  );
}