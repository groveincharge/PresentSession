import React from 'react';

const ProductList = (props) => {
 
    return (
     <div>
      name: {props.productname}
      price: {props.productprice}
      image: {props.productImage}
      path:  {props.productPath}
     </div>
     )
}

export default ProductList;