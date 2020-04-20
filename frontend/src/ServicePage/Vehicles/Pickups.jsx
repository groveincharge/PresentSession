import React from 'react';
import './../../_components/css/Pickups.css';
import {ExteriorDetail, InteriorDetail, EngineClean, FullDetail} from './../detailServices';

export const Pickups = ({match, location}) => {
  console.log('Pickups match', match)
  console.log('Pickups location', location)
    
    return (
         <div className='Pickups'>
         
             
            <div className='pickups-int'>
               <p>Interior Detail</p>
                <p>Mid-Size-Pickups: $75</p>
                <p>Full-Size-Pickups: $90</p>
              <InteriorDetail/>
              </div>

              <div className='pickups-ext'>
              <p>Exterior Detail</p>
              <p>Mid-Size-Pickups: $75</p>
                <p>Full-Size-Pickups: $90</p>
                 <ExteriorDetail/>
              </div>

              <div className='pickups-full'>
                <p>Full Detail</p>
                <p>Mid-Size-Pickups: $150</p>
                <p>Full-Size-Pickups: $180</p>
                 <FullDetail/>
              </div>

              <div className='pickups-eng'>
               <p>Engine Detail</p>
               <p>Mid-Size-Pickups: $75</p>
               <p>Full-Size-Pickups: $90</p>
                 <EngineClean/>
              </div>

         </div>
          );
};
 