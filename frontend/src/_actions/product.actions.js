import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import axios from 'axios';

export const productActions = {
    addProduct,
    getAll,
    _delete,
    getById
   };

function addProduct(product) {
    console.log('product.actions',product)
    return dispatch => {
        dispatch(request(product));

        productService.addProduct(product)
            .then(product => { 
                    dispatch(success(product));
                   // history.push('/');
                    dispatch(alertActions.success('product added successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(product) { return { type: productConstants.ADD_PRODUCT_REQUEST, product } }
    function success(product) { return { type: productConstants.ADD_PRODUCT_SUCCESS, product } }
    function failure(error) { return { type: productConstants.ADD_PRODUCT_FAILURE, error } }
 }

function getById(_id) {
    return dispatch => {
        dispatch(request(_id));

        productService.getById(_id)
            .then(
                product => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Item Available successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: productConstants.GETITEM_PRODUCT_REQUEST, _id } }
    function success(id) { return { type: productConstants.GETITEM_PRODUCT_SUCCESS, _id } }
    function failure(error) { return { type: productConstants.GETITEM_PRODUCT_FAILURE, error } }
}

function getAll(getproducts) {
    console.log('product.actions getproducts ',getproducts)
    return dispatch => {
        dispatch(request(getproducts));

        productService.getAll(getproducts)
            .then(
                getproducts => dispatch(success(getproducts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(getproducts) { return { type: productConstants.GETALL_PRODUCT_REQUEST, getproducts } }
    function success(getproducts) { return { type: productConstants.GETALL_PRODUCT_SUCCESS, getproducts } }
    function failure(error) { return { type: productConstants.GETALL_PRODUCT_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(_id) {
    return dispatch => {
        dispatch(request(_id));

        productService._delete(_id)
            .then(
                product => dispatch(success(_id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: productConstants.DELETE_PRODUCT_REQUEST, _id } }
    function success(id) { return { type: productConstants.DELETE_PRODUCT_SUCCESS, _id } }
    function failure(id, error) { return { type: productConstants.DELETE_PRODUCT_FAILURE, _id, error } }
}