import React from 'react';
import './css/productList.css';
import PropTypes from 'prop-types';

const ProductList = ({prodlist}) => {
 
    return (
     <div>
      {prodlist.map(item => (
      	                           <ul key={item._id}>
      	                           <li>{item.name}</li>
      	                           <li>{item.price}</li>
      	                           <li><img style={{ width: '50%' }} src={item.prodPath} alt='' /></li>
      	                           </ul>
      	                             ))}
     </div>
     )
  }

 ProductList.propTypes = {
  prodlist: PropTypes.array.isRequired
};

export default ProductList;