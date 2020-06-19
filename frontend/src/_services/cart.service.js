export const cartService = {
    addToCart,
    getAll,
};

function addToCart(orderList) {
    console.log('order.service frontend addToCart orderList ',orderList)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderList)
    };

    return fetch('http://localhost:7000/orders/addToCart', requestOptions)
        .then(handleResponse)
        .then(orderList => {
            console.log('order.service frontend order ',orderList)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('order', JSON.stringify(orderList));

            return orderList;
        });
    };

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`http://localhost:7000/orders/getAll`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log('reponse',response)
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log('handleResponse data.addedItems',data)
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