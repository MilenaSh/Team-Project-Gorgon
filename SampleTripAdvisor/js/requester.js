import $ from 'jquery';

const requester = function() {
    const database = firebase.database();

    // Get first N-objects 
    // TODO: edit to take from lastly-added object, make function more abstract    
    function getFirebaseData(directory, count) {
        const promise = new Promise((resolve, reject) => {
            database.ref(directory).limitToFirst(count).once('value').then((data) => resolve(data));
        });

        return promise;
    }

    function getData(url) {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'GET',
                contentType: 'application/json',
                success: (data) => resolve(data)
            });
        });

        return promise;
    }

    return {
        getFirebaseData,
        getData
    };
};

export { requester };