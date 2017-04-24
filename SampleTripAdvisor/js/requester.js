const requester = function() {
    const database = firebase.database();

    // Get first N-objects 
    // TODO: edit to take from lastly-added object
    function getData(directory, count) {
        const promise = new Promise((resolve, reject) => {
            database.ref(directory).limitToFirst(count).once('value').then((data) => resolve(data));
        });

        return promise;
    }

    return {
        getData
    };
};

export { requester };