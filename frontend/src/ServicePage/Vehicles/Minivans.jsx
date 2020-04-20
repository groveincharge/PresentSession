import React from 'react';
import './../../_components/css/Minivans.css';
import {ExteriorDetail, InteriorDetail, EngineClean, FullDetail} from './../detailServices';

export const Minivans = ({match, location}) => {
  console.log('Minivans match', match)
  console.log('Minivans location', location)

    return ( 
         <div className='Minivans'>
         
             <div className='minivans-int'>
               <p>Interior Detail</p>
                <p>Minivans: $100</p>
              <InteriorDetail/>
              </div>

              <div className='minivans-ext'>
              <p>Exterior Detail</p>
                <p>Minivans: $100</p>
                 <ExteriorDetail/>
              </div>

              <div className='minivans-full'>
                <p>Full Detail</p>
                <p>Minivans: $190</p>
                 <FullDetail/>
              </div>

              <div className='minivans-eng'>
               <p>Engine Detail</p>
               <p>Minivans: $75</p>
                 <EngineClean/>
              </div>

        </div> 
       );
}
 