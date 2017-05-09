const userRequester = function (genericRequester) {
    const requester = genericRequester;

    if(!requester) {
        throw 'Requester cannot be null';
    }

    function register(body) {
        return requester.post('api/users', body);
    }

    function login(body) {
        return requester.put('api/users', body);
    }

    function getUser(username) {
        return requester.get('api/users/' + username);
    }

    function editUser(username, userId) {
        const body = {
            username: username,
            id: userId
        };

        return requester.patch('api/users', body);
    }

    return {
        register: register,
        login: login,
        getUser: getUser,
        editUser: editUser
    };
};

export { userRequester };



