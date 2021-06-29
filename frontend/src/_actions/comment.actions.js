import { commentConstants } from '../_constants/comment.constants';
import { commentService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import axios from 'axios';

export const commentActions = {
    addComment,
    getAll,
    _delete,
    getById
   };

function addComment(user) {
    console.log('comment.actions',product)
    return dispatch => {
        dispatch(request(user));

        commentService.addComment(user)
            .then( user => { 
                    dispatch(success(user));
                   // history.push('/');
                    dispatch(alertActions.success('comment added successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: commentConstants.ADD_COMMENT_REQUEST, user } }
    function success(user) { return { type: productConstants.ADD_COMMENT_SUCCESS, user } }
    function failure(error) { return { type: productConstants.ADD_COMMENT_FAILURE, error } }
 }

function getById(_id) {
    return dispatch => {
        dispatch(request(_id));

        commentService.getById(_id)
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

    function request(id) { return { type: commentConstants.GETITEM_COMMENT_REQUEST, id } }
    function success(id) { return { type: productConstants.GETITEM_COMMENT_SUCCESS, id } }
    function failure(error) { return { type: productConstants.GETITEM_COMMENT_FAILURE, error } }
}

function getAll(items) {
    console.log('product.actions items ',items)
    return dispatch => {
        dispatch(request(items));

        commentService.getAll(items)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(items) { return { type: productConstants.GETALL_COMMENT_REQUEST, items } }
    function success(items) { return { type: productConstants.GETALL_COMMENT_SUCCESS, items } }
    function failure(error) { return { type: productConstants.GETALL_COMMENT_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(_id) {
    return dispatch => {
        dispatch(request(_id));

        commentService._delete(_id)
            .then(
                comment => dispatch(success(_id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: productConstants.DELETE_COMMENT_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETE_COMMENT_SUCCESS, id } }
    function failure(error) { return { type: productConstants.DELETE_COMMENT_FAILURE, error } }
}