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

    // Add data to the DB with some parameters (can be easily changed) 
    // this overwrites if sending on id that is taken
    function addToFirebase(id, name, city) {
        database.ref(`/objects/${id}`).set({
            name: name,
            city: city
        });
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

    function addToFirebase1(directory, id, content) {
        database.ref(`${directory}/${id}`).set(content);
    }

    return {
        addToFirebase,
        getFirebaseData,
        getData,
        addToFirebase1
    };
};

export { requester };