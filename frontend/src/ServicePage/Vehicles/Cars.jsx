import React from 'react';
import './../../_components/css/Cars.css';
import {ExteriorDetail, InteriorDetail, EngineClean, FullDetail} from './../detailServices';

export const Cars = ({match, location}) => {
  console.log('Cars match', match)
  console.log('Cars location', location)
      
      return (
           <div className='Cars'>
             
             <div className='cars-int'>
               <p>Interior Detail</p>
                <p>Mid-Size-Car: $65</p>
                <p>Full-Size-Car: $75</p>
              <InteriorDetail/>
              </div>

              <div className='cars-ext'>
              <p>Exterior Detail</p>
              <p>Mid-Size-Car: $65</p>
                <p>Full-Size-Car: $75</p>
                 <ExteriorDetail/>
              </div>

              <div  className='cars-full'>
                <p>Full Detail</p>
                <p>Mid-Size-Car: $125</p>
                <p>Full-Size-Car: $150</p>
                 <FullDetail/>
              </div>

              <div  className='cars-eng'>
               <p>Engine Detail</p>
               <p>Mid-Size-Car: $65</p>
               <p>Full-Size-Car: $75</p>
                 <EngineClean/>
              </div>
  
           </div>
           )
     };
 

 
 