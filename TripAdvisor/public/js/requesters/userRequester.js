const userRequester = function (genericRequester) {
    const requester = genericRequester;

    function register(body) {
        return requester.post('api/users', body);
    }

    function login(username, passHash) {
        const body = {
            username,
            passHash
        };

        return requester.put('api/users', body);
    }

    return {
        register: register,
        login: login
    };
};

export { userRequester };



