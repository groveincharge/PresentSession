import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Product from './components/product';
import Service from './components/service';
import Logout from './components/logout';
import AppliedRoute from "./components/AppliedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/about" exact component={About} appProps={appProps} />
        <AppliedRoute path="/contact" exact component={Contact} appProps={appProps} />
      <AppliedRoute path="/product" exact component={Product} appProps={appProps} />
        <AppliedRoute path="/service" exact component={Service} appProps={appProps} />
      <AppliedRoute path="/logout" exact component={Logout} appProps={appProps} />
    </Switch>
  );
}