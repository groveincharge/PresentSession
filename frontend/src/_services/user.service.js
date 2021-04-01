import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(login_data => {
            const {loggedInUser, auth_msg, isAuthenticated} = login_data;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
            console.log(`loggegInUser from inside user.service login ${loggedInUser}`);
            console.log(`auth_msg ${auth_msg}`);

            return login_data;
        })
        .catch(err => {error: err});
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/`, requestOptions)
           .then(handleResponse)
           .then(users => {
            localStorage.setItem('users', JSON.stringify(users));
               //console.log(`users inside getAll ${users}`);
               return users;
             })
           .catch(err => {error: err});
};

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

 function register(user) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/register`, requestOptions)
    .then(handleResponse)
    .then(
        regUser => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('regUser', JSON.stringify(regUser.regUser));
            return regUser;
        },
        error => {
            localStorage.setItem('errors', JSON.stringify(error.error));
            console.log(`error.error ${error.error}`)
            return error.error;
        })
    .catch(err => {error: err});
    };

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions)
    .then(handleResponse)
    .catch(err => {error: err});
    }
 
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`${config.apiUrl}/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}