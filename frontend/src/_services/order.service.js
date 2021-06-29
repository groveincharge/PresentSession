import config from 'config';
//import { authHeader } from '../_helpers';

export const orderService = {
    addOrder,
    getAll,
    getByOrderId,
    updateOrder,
    deleteOrder
};

function addOrder(order) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
       // credentials: "include"
    };
      
    // api callback to login route.
    return fetch(`${config.apiUrl}/api/order`, requestOptions)
        .then(handleResponse)
        .then(order => {
            console.log(`user from inside login ${JSON.stringify(user)}`)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('order', JSON.stringify(order));
            return user;
        });
}

function getByOrderId(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/orders/getByOrderId/${id}`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/orders/getAll`, requestOptions).then(handleResponse);
}

function updateOrder(order) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(order),
       // credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/orders/updateUser/${order._id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteOrder(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      //  credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/orders/deleteOrder/${id}`, requestOptions).then(handleResponse);
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