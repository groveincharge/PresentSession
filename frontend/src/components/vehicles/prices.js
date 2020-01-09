import React from 'react';
import './../css/prices.css';

  
    const Prices = () => {

   return (
     <div className="Prices">
       <div className="Car">
       <h3>Car Detail Prices</h3>
           <p>Interior Detail -> 65.00</p>
           <p>Exterior Detail -> 65.00</p>
           <p>Engine Detail -> 65.00</p>
           <img src={'/uploads/vehicle4.JPG'} width="75%" alt=" "/>
       </div>

         <div className="Suv">
       <h3>Suv Detail Prices</h3>
           <p>Interior Detail -> 75.00</p>
           <p>Exterior Detail -> 75.00</p>
           <p>Engine Detail -> 65.00</p>
           <img src={'/uploads/vehicle4.JPG'} width="75%" alt=" "/>
       </div>

        <div className="Jeep">
       <h3>Jeep Detail Prices</h3>
           <p>Interior Detail -> 75.00</p>
           <p>Exterior Detail -> 75.00</p>
           <p>Engine Detail -> 65.00</p>
           <img src={'/uploads/vehicle4.JPG'} width="75%" alt=" "/>
       </div>

         <div className="Minivan">
       <h3>Minivan Detail Prices</h3>
           <p>Interior Detail -> 100.00</p>
           <p>Exterior Detail -> 100.00</p>
           <p>Engine Detail -> 65.00</p>
           <img src={'/uploads/vehicle4.JPG'} width="75%" alt=" "/>
       </div>

       </div>
       )
   }

   export default Prices;