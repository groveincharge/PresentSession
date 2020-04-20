import React from 'react';
import './../../_components/css/Jeeps.css';
import {ExteriorDetail, InteriorDetail, EngineClean, FullDetail} from './../detailServices';

export const Jeeps = ({match, location}) => {
  console.log('Jeeps match', match)
  console.log('Jeeps location', location)

    return ( 
          <div className='Jeeps'>
        
             <div className='jeeps-int'>
               <p>Interior Detail</p>
                <p>Jeeps: $75</p>
              <InteriorDetail/>
              </div>

              <div className='jeeps-ext'>
              <p>Exterior Detail</p>
                <p>Jeeps: $75</p>
                 <ExteriorDetail/>
              </div>

              <div className='jeeps-full'>
                <p>Full Detail</p>
                <p>Jeeps: $150</p>
                 <FullDetail/>
              </div>

              <div className='jeeps-eng'>
               <p>Engine Detail</p>
               <p>Jeeps: $75</p>
                 <EngineClean/>
              </div>

        </div>
     );
}
 