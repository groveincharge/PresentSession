export const productService = {
    addProduct,
    getAll,
    getByProductId,
    deleteProduct,
    updateProduct
};

import config from 'config';

function addProduct(product) {
    console.log('product.service frontend addProduct',product)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch(`${config.apiUrl}/api/products`, requestOptions)
        .then(handleResponse)
        .then(product => {
            console.log('product.service frontend product',product)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('product', JSON.stringify(product));

            return product;
        });
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/api/product/getAll`, requestOptions).then(handleResponse);
}


function getByProductId(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/products/getByProductId/${id}`, requestOptions).then(handleResponse);
}

function updateProduct(product) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(user),
       // credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/products/updateProduct/${product._id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteProduct(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      //  credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/products/deleteProduct/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log('reponse',response)
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log('handleResponse data',data)
        if (!response.ok) {
            if (response.status === 401) {
                console.log('data already exist.')
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}