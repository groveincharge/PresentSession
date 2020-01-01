import React, {Component} from 'react';
import './css/login.css';


  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { email: " ",
                    username: " ",
                    password: " "
                  };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      event.persist();
      this.setState(state => ({...state, [event.target.name]: event.target.value}));
    };

    handleSubmit(event) {
     // alert('Your email was submitted: ' + this.state.email);
      event.preventDefault();
          fetch('/api/login', {
                     method: 'POST',
                     headers: {
                          'Content-Type':'application/json'
                            },
                     body: JSON.stringify(this.state)
            })
             .then(res => res.json())
             .then(data => {
                 if (data.errors) {
              data.errors.map(error => {
                alert(error.msg);
                console.log(error.msg)
                })
             } 
          if (data.authUser) {
               alert(data.message)
               console.log(data.authUser)
              }
         if (data.message) {
             alert(data.message);
            console.log(data.message)
           }
             })
                           .catch(err => console.log(err));
                            this.setState({
                             email: " ",
                             username: " ",
                             password: " " 
                           }) 
       };
  
    render() {
      return (
             <div className="LoginId">
               <h1>Login</h1><br/>
               <p>If Already Registered</p>
        <form onSubmit={this.handleSubmit}>
          <><br/>
            Email:
            <input type="text" name="email" value={this.state.email} 
            onChange={this.handleChange} required/>
          </><br/>

          <><br/>
           Username:
          <input type="text" name="username" value={this.state.username} 
          onChange={this.handleChange} required/>
          </><br/>
          <><br/>
            Password:
          <input type="text" name="password" value={this.state.password} 
          onChange={this.handleChange} required/>
          </><br/><br/>

          <input type="submit" value="Submit"/>
        </form>
        </div>
      );
    }
  }
 
export default Login;