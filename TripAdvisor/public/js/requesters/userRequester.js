const userRequester = function (genericRequester) {
    const requester = genericRequester;

    function register(body) {
        return requester.post('api/users', body);
    }

    function login(body) {
        return requester.put('api/users', body);
    }

    return {
        register: register,
        login: login
    };
};

export { userRequester };



