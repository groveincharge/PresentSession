import { cartActions } from './../../_actions/cart.actions'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const CartPage = ({total, removeFromCart, addedItems, increment, decrement}) => {

    console.log('cartPage addedItems ',addedItems)
     console.log('cartPage total ',Math.round(total*100))
              
        let orderedItems = addedItems ?
            (  
                addedItems.map(item=>{
                    return(
                       
                        <li className="collection-item avatar" key={item._id}>
                                    <div className="item-img"> 
                                        <img src={item.toFilePath} alt={item.img} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{item.itemName}</span>
                                        <p>{item.description}</p>
                                        <p><b>Price: ${item.itemPrice}</b></p> 
                                        <p>
                                            <b>Quantity: {item.quantity}</b> 
                                        </p>
                                        <div className="add-remove">
                                            <Link to="/cart"><i className="fa fa-arrow-up" aria-hidden="true" onClick={()=>{increment(item._id)}}>up</i></Link>
                                            <Link to="/cart"><i className="fa fa-arrow-down" aria-hidden="true" onClick={()=>{decrement(item._id)}}>down</i></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn pink remove" onClick={()=>{removeFromCart(item._id)}}>Remove</button>
                                    </div>
                                    
                               </li>                        
                    )
                })
            ):
             (
                <p>Nothing.</p>  
             )
       return(
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <span>
                    total: ${Math.round(total*100)/100}
                    </span>
                    <ul className="collection">
                        {orderedItems}
                    </ul>
                </div>  
            </div>
       )
    }

const mapStateToProps = (state)=>{
    return{
        addedItems: state.cartReducer.addedItems,
        total: state.cartReducer.total
    }
  }

    const actionCreators = {
     increment: cartActions.increment,
     decrement: cartActions.decrement,
     removeFromCart: cartActions.removeFromCart
    }
    
    const connectedCartPage = connect(mapStateToProps, actionCreators)(CartPage);
    export { connectedCartPage as CartPage };