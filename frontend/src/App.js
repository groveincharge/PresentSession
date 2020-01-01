import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/nav';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Product from './components/product';
import Service from './components/service';
import Footer from './components/footer';
import FooterNote from './components/footerNote';
import Logout from './components/logout';


import './App.css';

function App() {
  return (
      <Router>
    <div className="App">
     <Nav/>
      <Switch>
      <Route path="/" exact component={Home} />
       <Route path="/about" exact component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/product" component={Product} />
       <Route path="/service" exact component={Service} />
       <Route path="/logout" component={Logout} />
      </Switch>
      <Footer/>
      <FooterNote/>
    </div>
    </Router>
  );
}

export default App;
