import { Link } from 'react-router-dom';
import { userConstants } from './../_constants';
import { userService } from './../_services';
import { alertActions } from './';
import { history } from './../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    console.log(`user from inside user.actions login() ${JSON.stringify(user)}`);
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        dispatch(request());
        userService.logout()
            .then(loggedOut => { 
                    console.log(`loggedOut from inside user.actions logout() ${JSON.stringify(loggedOut)}`)
                    dispatch(success(loggedOut));
                    history.push('/login');
                    dispatch(alertActions.success('Logout successful'));
                },
                error => {
                    console.log(`error from inside user.actions then() error ${JSON.stringify(JSON.stringify(error))}`)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                });
    };

    function request() { return { type: userConstants.LOGOUT_REQUEST} }
    function success(loggedOut) { return { type: userConstants.LOGOUT_SUCCESS, loggedOut} }
    function failure(error) { return { type: userConstants.LOGOUT_FAILURE, error } }
}

//function logout() {
  //  userService.logout();
  //  return { type: userConstants.LOGOUT };
//}

 function register(user) {
    return dispatch => {
        dispatch(request(user));
        console.log(`user from above user.actions then() ${JSON.stringify(user)}`)
        userService.register(user)
            .then(
                user => { 
                    console.log(`user from inside user.actions then() ${JSON.stringify(user)}`)
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    console.log(`error from inside user.actions then() error ${JSON.stringify(JSON.stringify(error))}`)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users.users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(_id) {
    return dispatch => {
        dispatch(request(_id));

        userService.delete(_id)
            .then(
                user => dispatch(success(user._id)),
                error => dispatch(failure(user._id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, _id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, _id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, _id, error } }
}