import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { cartActions } from './../../_actions/cart.actions';
import { productActions } from './../../_actions/product.actions'
import axios from 'axios';

  const OrderPage = (props) => {

   const [loaded, setLoaded] = useState(false);
   
   console.log('OrderPage props ',props)
    console.log('OrderPage props.items.items ',props.items.items)
    console.log('OrderPage loaded ',loaded)

    useEffect(() => { 
    const list = axios.get('http://localhost:7000/products/getAll')
       .then(res => {
       console.log('res.data.items ', res.data.items)
        props.getAll(res.data.items)
       })
    .catch(err => console.log(err)) 
    },[]) 

   const handleClick = (_id) => props.addToCart(_id)

    //console.log('OrderPage _id ',_id)
      
        let itemList = props.items.items? props.items.items.map(item=>{
            return(
                <div className="card" key={item._id}>
                        <div className="card-image">
                            <img src={item.toFilePath} alt={item.itemName}/>
                            <span className="card-title">{item.itemName}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{handleClick(item._id)}}><i className="fas fa-plus">cart</i></span>
                        </div>

                        <div className="card-content">
                            <p>{item.description}</p>
                            <p><b>Price: {item.itemPrice}$</b></p>
                        </div>
                 </div>
            )
        }):[]

        return(
            <div className="container">
                <h3 className="center">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
}

function mapState(state) {
    return {
        items: state.cartReducer
       }
    }
    
    const actionCreators = {
     addToCart: cartActions.addToCart,
     getAll: cartActions.getAll
    }
    
    const connectedOrderPage = connect(mapState, actionCreators)(OrderPage);
    export { connectedOrderPage as OrderPage };
