import React from 'react';
import './../../_components/css/Suvs.css';
import {ExteriorDetail, InteriorDetail, EngineClean, FullDetail} from './../detailServices';

export const Suvs = (props) => {
  console.log('Suvs props', props)
    return ( 
          <div className='Suvs'>
         
             <div className='suvs-int'>
               <p>Interior Detail</p>
                <p>Mid-Size-Suv: $75</p>
                <p>Full-Size-Suv: $90</p>
              <InteriorDetail/>
              </div>

              <div className='suvs-ext'>
              <p>Exterior Detail</p>
              <p>Mid-Size-Suv: $75</p>
                <p>Full-Size-Suv: $90</p>
                 <ExteriorDetail/>
               </div>

                 <div className='suvs-full'>
                <p>Full Detail</p>
                <p>Mid-Size-Suv: $150</p>
                <p>Full-Size-Suv: $180</p>
                 <FullDetail/>
              </div>

              <div className='suvs-eng'>
               <p>Engine Detail</p>
               <p>Mid-Size-Suv: $75</p>
               <p>Full-Size-Suv: $90</p>
                 <EngineClean/>
              </div>

         </div> 
         );
}
 