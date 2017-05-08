import 'jquery';

const genericRequester = function () {
    function send(url, method, body) {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: method,
                contentType: 'application/json',
                data: JSON.stringify(body),
                success: response => resolve(response),
                error: response => reject(response)
            });
        });

        return promise;
    }

    function get(url, body) {
        return send(url, 'GET', body);
    }

    function post(url, body) {
        return send(url, 'POST', body);
    }

    function put(url, body) {
        return send(url, 'PUT', body);

    }

    function patch(url, body) {
        return send(url, 'PATCH', body);

    }

    return {
        get: get, 
        post: post, 
        put: put, 
        patch: patch
    };
};

export {genericRequester};