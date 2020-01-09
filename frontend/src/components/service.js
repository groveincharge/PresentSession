import React from 'react';
import Prices from './vehicles/prices';
import Chores from './vehicles/chores';

const Service = ({isAuthenticated}) => { 

   if (isAuthenticated) {
  return (
    <div className="Services">
    <Prices/>
    <Chores/>
    </div>
    )
     } 
     else {
        return (<div>Register And/Or Login To Access Service</div>)
     }
   };

export default Service;