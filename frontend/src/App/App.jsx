import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { history } from './../_helpers';
import { alertActions } from './../_actions';
import {IconFooter} from './../_components/IconFooter';
import { CopyRightNote } from './../_components/CopyRightNote';
import { PrivateRoute } from './../_components/PrivateRoute';
import { Intro } from './../_components/Intro';
import { Nav } from './../_components/Nav';
import {VehicleNav} from './../ServicePage/Vehicles/VehicleNav';
import { About } from './../_components/About';
import { Contact } from './../_components/Contact';
import { HomePage } from './../HomePage';
import { LoginPage } from './../LoginPage';
import { RegisterPage } from './../RegisterPage';
import { ProductPage } from './../ProductPage';
import  {CartPage}  from './../ProductPage/AddPicture/CartPage';
import { ServicePage } from './../ServicePage';
import {Cars} from './../ServicePage/Vehicles/Cars';
import {Suvs} from './../ServicePage/Vehicles/Suvs';
import {Jeeps} from './../ServicePage/Vehicles/Jeeps';
import {Minivans} from './../ServicePage/Vehicles/Minivans';
import {Pickups} from './../ServicePage/Vehicles/Pickups';
import './../_components/css/App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                           <Nav />
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/about" component={RegisterPage} />
                                <PrivateRoute path="/contact" component={Contact} />
                                <PrivateRoute path="/product" component={ProductPage} />
                                <PrivateRoute path="/service" component={ServicePage} />
                                <PrivateRoute path="/cart" component={CartPage} />
                            </Switch>
                        </Router>
                    </div>
                </div>
                <IconFooter/>
                <CopyRightNote/>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };