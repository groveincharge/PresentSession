import React, {useState, useEffect} from 'react';

  
  /*const [loaded, setLoaded] = useState({
           isLoaded: false
        })*/

const Logout = (props) => {
  const [message, setMessage] = useState({
  message: " "
});

  useEffect(() => {
    fetch('/api/logout')
   .then(res => res.json())
   .then(data => {
    if (data.auth_msg) {
      setMessage({message: data.auth_msg})
      alert(data.auth_msg)
    }
    else
      if (data.unauth_msg) {
         setMessage({message: data.unauth_msg})
      alert(data.unauth_msg)
    }
    })
   .catch({
      message: 'User must be logged in.'
   })
     },[]);

    return ( 
        <div>
            <h1>logout page</h1>
             <p>logged message: {message.message}</p>
        </div>
     );
  }
 
export default Logout;