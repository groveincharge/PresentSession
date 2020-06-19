import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './../../_components/css/AddPicture.css';
import {OrderPage} from './OrderPage';
import {CartPage} from './CartPage';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

    

export const DisplayProducts = ({ item: {getproducts}}) => {

if (getproducts) {
  
  console.log('DisplayProducts getproducts if',getproducts)

   return (
       <React.Fragment>
        
    {getproducts.map((getproduct, index) => {
      return <ul key={getproduct._id} className="AddPicture">
          item: <li>{getproduct.itemName}</li>
         price: <li>{getproduct.itemPrice}</li>
         description: <li>{getproduct.description}</li>
       picture: <li><img style={{width: '50%'}} src={getproduct.toFilePath} alt=""/></li>
       Add to Cart: <input type="checkbox" 
                           className="product-cart" 
                           name={getproduct.itemName}
                           /><br/>
             </ul> 
           })}

  </React.Fragment>
     )
     } else
        {
      return (   
        <React.Fragment>
          Product Loading ...
        </React.Fragment>
      )

    }
};
