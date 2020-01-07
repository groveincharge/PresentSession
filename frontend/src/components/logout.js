import React, {useState, useEffect} from 'react';

  
  /*const [loaded, setLoaded] = useState({
           isLoaded: false
        })*/

const Logout = ({isAuthenticated, userHasAuthenticated}) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/logout')
   .then(res => res.json())
   .then(data => {
    if (isAuthenticated) {
      setMessage(data.auth_msg)
      userHasAuthenticated(false)
      alert(data.auth_msg)
    } else
      if ((!isAuthenticated) && (data.unauth_msg))  {
      setMessage(data.unauth_msg)
      alert(data.unauth_msg)
      }
    else
      if ((!isAuthenticated) && (!data.unauth_msg) )  {
      setMessage('User Must Be Logged In.')
      alert('User Must Be Logged In.')
      }
    })
   .catch({
      message: 'User Must Be Logged In.' 
   })
     },[]);

    return ( 
        <div>
            <h1>logout page</h1>
             <p>logged message: {message}</p>
        </div>
     );
  }
 
export default Logout;