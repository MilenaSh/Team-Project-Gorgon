import * as requester from 'requester';

export function getUsers() {
    // TODO: Add authentication
    return requester.get('/users');
}

export function login(username, passHash) {
    const body = {
        username,
        passHash
    };

    return requester.put('/auth', body);
}

export function register(username, passHash) {
    const body = {
        username,
        passHash
    };

    return requester.post('/users', body);
}
