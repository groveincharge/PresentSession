import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {Cars} from './Vehicles/Cars';
import {Suvs} from './Vehicles/Suvs';
import {Jeeps} from './Vehicles/Jeeps';
import {Minivans} from './Vehicles/Minivans';
import {Pickups} from './Vehicles/Pickups';
import {VehicleNav} from './Vehicles/VehicleNav';


export const ServicePage = ({match, location}) => {
      console.log('ServicePage match', match)
      console.log('ServicePage location', location)

     return (
         <div>
           <Router>
             <VehicleNav />
                <Switch>
                    <Route exact path="/service" component={Cars} />
                    <Route  path="/service/cars" component={Cars} />
                    <Route  path="/service/jeeps" component={Jeeps} />
                    <Route  path="/service/suvs" component={Suvs} />
                    <Route  path="/service/pickups" component={Pickups} />
                    <Route  path="/service/minivans" component={Minivans} />
                    
                </Switch>
            </Router>
         </div>
        )
     
    };
 
 