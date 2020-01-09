import React from 'react';
import './../css/chores.css';

const Chores = () => {
	return (
		<div className='Chores'>
		    <div className="Interior">
		  <h3>Interior</h3> 
           <p>1.Vacuum carpet and mats</p>
           <p>2.Spot clean carpet mats and seats</p>
           <p>3.Dust and clean dashboard and side panels</p>
           <p>3.Clean center console and cup holders</p>
           <p>4.Treat and protect dashboard and side panels</p>
           <p>6.Clean windows</p>
        </div>

         <div className="Exterior"> 
			<h3>Exterior</h3>
              <p>1.Handwash and chamois dry vehicle</p> 
              <p>2.Clean tires and rims</p>
              <p>3.Remove minor scratches tree sap and tar</p> 
              <p>4.Hand polish and buff exterior</p>
              <p>5.Dress tires</p>
              <p>6.Clean windows</p>
         </div>

         <div className="Engine"> 
			<h3>Engine</h3>
              <p>1.Brush loose dirt and cover electrical connections</p>
              <p>2.Degrease engine block and surrounding components</p>
              <p>3.Pressure wash engine block</p>
              <p>4.Blow dry or drip dry block</p> 
              <p>5.Add protection and gloss</p>
        </div>
		</div>
		)
}

export default Chores;