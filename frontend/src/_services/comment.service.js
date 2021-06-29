export const commentService = {
    addComment,
    getAll,
    getByCommentId,
    deleteComment,
    updateComment
    };

import config from 'config';

function addComment(user) {
    console.log('comment.service to frontend addComment',user)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/api/comments`, requestOptions)
        .then(handleResponse)
        .then(comment => {
            console.log('comment.service from frontend ',comment)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('comment', JSON.stringify(comment));

            return comment;
        });
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/comments/getAll`, requestOptions).then(handleResponse);
}

function getByCommentId(id) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/comments/getByCommentId/${id}`, requestOptions).then(handleResponse);
}

function updateComment(user) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(user),
       // credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/comments/updateUser/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteComment(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      //  credentials: "include"
    };

    return fetch(`${config.apiUrl}/api/comments/deleteComment/${id}`, requestOptions).then(handleResponse);
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