import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/nav';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Product from './components/product';
import Service from './components/service';
import AppliedRoute from "./components/AppliedRoute";
import Footer from './components/footer';
import FooterNote from './components/footerNote';
import Login from './components/login';
import Logout from './components/logout';
import Routes from './Routes';
import './App.css';

function App({appProps}) {

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  appProps = {isAuthenticated, userHasAuthenticated}

  return (
      <Router>
    <div className="App">
     <Nav/>
      <Switch>
       <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/about" exact component={About} appProps={appProps} />
        <AppliedRoute path="/contact" exact component={Contact} appProps={appProps} />
      <AppliedRoute path="/product" exact component={Product} appProps={appProps} />
        <AppliedRoute path="/service" exact component={Service} appProps={appProps} />
      <AppliedRoute path="/logout" exact component={Logout} appProps={appProps} />
      </Switch>

      <Footer/>
      <FooterNote/>
    </div>
    </Router>
  );
}

export default App;
