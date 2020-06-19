import { cartConstants } from '../_constants/cart.constants';
import { cartService } from '../_services/cart.service';
import { alertActions } from './';

export const cartActions = {
    addToCart,
    getAll,
    increment,
    decrement,
    removeFromCart
   };

   function getAll(items) {
    console.log('product.actions items ',items)
    return dispatch => {

        dispatch(success(items))
    };

    function success(items) { return { type: cartConstants.GETALL_PRODUCT, items} }
    function failure(error) { return { type: cartConstants.GETALL_PRODUCT_FAILURE, error } }
}


    function addToCart(_id) {

        console.log('cart.actions addToCart order ',_id)

        return dispatch => {
            dispatch(success(_id));
            dispatch(alertActions.success('item added to cart'));
        };
    
        function success(_id) { return { type: cartConstants.ADD_TO_CART, _id } }
        function failure(error) { return { type: cartConstants.ADD_TO_CART_FAILURE, error } }
    }


    function increment(_id) {

        console.log('cart.actions increment _id ',_id)

        return dispatch => {
    
            dispatch(success(_id));
    
        };
    
        function success(_id) { return { type: cartConstants.INCREMENT_CART, _id } }
    }

    function decrement(_id) {

        console.log('cart.actions decrement _id ',_id)

        return dispatch => {
    
            dispatch(success(_id));
    
        };
    
        function success(_id) { return { type: cartConstants.DECREMENT_CART, _id } }
    }

    function removeFromCart(_id) {

        console.log('cart.actions removeFromCart _id ',_id)

        return dispatch => {
    
            dispatch(success(_id));
    
        };
    
        function success(_id) { return { type: cartConstants.REMOVE_FROM_CART, _id } }
    }
    