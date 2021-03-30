export const productService = {
    addProduct,
    getAll,
};

import config from 'config';

function addProduct(product) {
    console.log('product.service frontend addProduct',product)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch(`${config.apiUrl}/product`, requestOptions)
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

    return fetch(`${config.apiUrl}/product`, requestOptions).then(handleResponse);
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