import {genericRequester} from "genericRequester"

const usergenericRequester = function () {
    function register(body) {
        return genericRequester().post('api/users', body);
    }

    function login(username, passHash) {
        const body = {
            username,
            passHash
        };

        return genericRequester().put('api/users', body);
    }

    return {
        register: register,
        login: login
    }
};

export {usergenericRequester};



