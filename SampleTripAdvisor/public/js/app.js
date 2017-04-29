import 'jquery';

function printData(data) {
    console.log(data);
}

// WORKS
function addRestaurant(name) {
    const promise = new Promise((resolve, reject) => {
        $.ajax({
            url: '/restaurants',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
               name: name 
            }),
            success: (data) => console.log(data),
            error: (data) => console.log(data)
        });
    });

    return promise;
}


// WORKS
function getSpecificRestaurantByName(name) {
    const promise = new Promise((resolve, reject) => {
        $.ajax({
            url: '/restaurants',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
               name: name 
            }),
            success: (data) => resolve(data),
            error: (data) => reject(data)
        });
    });

    return promise;
}

function editSpecificRestaurant(name, data) {
    data['name'] = name;

    const promise = new Promise((resolve, reject) => {
        $.ajax({
            url: '/restaurants',
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (data) => resolve(data),
            error: (data) => reject(data)
        });
    });

    return promise;
}

