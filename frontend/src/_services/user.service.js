import config from 'config';
//import { authHeader } from '../_helpers';

export const userService = {
    getAll,
    login,
    logout,
    register,
    getByUserId,
    updateUser,
    deleteUser
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
       // credentials: "include"
       };

    return fetch(`http://localhost:4000/api/users/register`, requestOptions).then(handleResponse);
    
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
       // credentials: "include"
    };
      
    // api callback to login route.
    return fetch(`${config.apiUrl}/api/users`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(`user from inside login ${JSON.stringify(user)}`)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //credentials: "include"
    };
    return fetch(`${config.apiUrl}/api/users/logout`, requestOptions)
        .then(handleResponse)
        .then(loggedOut => {
         localStorage.removeItem('user');
         localStorage.removeItem('userSession');
            return loggedOut;
        });
}

function getByUserId(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/users/getByUserId/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        //credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/users/register`, requestOptions).then(handleResponse);
}

function updateUser(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(user),
       // credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/users/updateUser/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      //  credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/users/deleteUser/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(`data from inside handleResponse ${JSON.stringify(data)}`);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
               logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            console.log(`data from inside handleResponse ${JSON.stringify(data)}`);
            return Promise.reject(error);
        }
        return data;
    });
}