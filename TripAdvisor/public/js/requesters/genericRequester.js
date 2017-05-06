import 'jquery';

const genericRequester = function() {
    function get(url, body) {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: url,
                data: JSON.stringify(body),
                contentType: 'application/json',
                success: (data) => resolve(data),
                error: (data) => reject(data)
            });
        });

        return promise;
    }

    function post(url, body) {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(body),
                contentType: 'application/json',
                success: (data) => resolve(data),
                error: (data) => reject(data)
            });
        });

        return promise;
    }

    function put(url, body) {        
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                type: 'PUT',
                url: url,
                data: JSON.stringify(body),
                contentType: 'application/json',
                success: (data) => resolve(data),
                error: (data) => reject(data)
            });
        });

        return promise;
    }

    function patch(url, body) {        
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                type: 'PATCH',
                url: url,
                data: JSON.stringify(body),
                contentType: 'application/json',
                success: (data) => resolve(data),
                error: (data) => reject(data)
            });
        });

        return promise;
    }

    return {
        get: get,
        post: post,
        put: put,
        patch: patch
    };
};

export { genericRequester };