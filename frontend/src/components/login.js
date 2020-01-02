import React, {useEffect, useState} from 'react';
import './css/login.css';


  const Login = () => {
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const [message, setMessage] = useState('');
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
          
          if (data.auth_msg) {
               alert(data.auth_msg)
               setMessage(data.auth_msg)
               console.log(data.sessionUser)
                console.log(data.auth_msg)
              }

         if (data.unauth_msg) {
             alert(data.unauth_msg);
              setMessage(data.unauth_msg)
            console.log(data.unauth_msg)
           }
             })
             .catch(err => console.log(err));
                setEmail(' ') 
                setPassword(' ')
             };
  
          loginerrors.loginerrors.map(err => {
                console.log(err.msg) 
          })

      return (
             <div className="LoginId">
               <h1>Login</h1><br/>
               <p>If Already Registered</p>
           {loginerrors.loginerrors.map((item, index) => (<p key={index}>{item.msg}</p>))}
               <p>{message}</p>
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