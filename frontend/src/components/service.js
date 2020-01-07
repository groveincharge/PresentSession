import React from 'react';


const Service = (props) => { 
	console.log(props)
  if (props.isAuthenticated) {
  return (
    <div className="Services">
     <h1>The service page</h1>
    </div>
  );
   }
   else {
     return (<div>Register And/Or Login To Access Services</div>)
     }

};

export default Service;