import React, {useState} from 'react';
import './css/login.css';


  const Login = ({isAuthenticated, userHasAuthenticated}) => {
       console.log('Login',isAuthenticated)

       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const [message, setMessage] = useState('')
       const [sessionUser, setSessionUser] = useState({})
       const [loginerrors, setLoginerrors] = useState({
              loginerrors: []
       });
  
   const handleChange = (event) => {
      event.persist();
        if (event.target.name === 'email') {
      setEmail(event.target.value)
    } 
    else
    if (event.target.name === 'password') {
       setPassword(event.target.value)
    }
    };

    const handleSubmit = (event) => {
     // alert('Your email was submitted: ' + this.state.email);
     const user = {email, password}
      event.preventDefault();
          fetch('/api/login', {
                     method: 'POST',
                     headers: {
                          'Content-Type':'application/json'
                            },
                     body: JSON.stringify(user)
            })
             .then(res => res.json())
             .then(data => {
              if (data.errors) {
              const {errors} = data
              console.log(errors)  
               setLoginerrors({loginerrors: errors})     
            }
          
          if (data.isAuthenticated) {
               setMessage(data.auth_msg)
               setSessionUser(data.sessionUser)
               userHasAuthenticated(data.isAuthenticated)
              }

         if (!data.isAuthenticated) {
              setMessage(data.unauth_msg)
            console.log(data.unauth_msg)
           }
             })
             .catch(err => console.log(err));
             setEmail('')
             setPassword('')
             };

      return (
             <div className="LoginId">
               <h1>Login</h1><br/>
               <p>If Already Registered</p>
           {loginerrors.loginerrors.map((item, index) => (<p key={index} 
                                        style={{ background: '#ADD8E6' }}>
                                       {item.msg}</p>))}
               <p style={{ background: '#ADD8E6' }}>{message}</p>
        <form onSubmit={handleSubmit}>
          <><br/>
            Email:
            <input type="text" name="email" value={email} 
            onChange={handleChange} required/>
          </><br/>

          <><br/>
            Password:
          <input type="text" name="password" value={password} 
          onChange={handleChange} required/>
          </><br/><br/>

          <input type="submit" value="Submit"/>
        </form>
        </div>
      );
  }
 
export default Login;