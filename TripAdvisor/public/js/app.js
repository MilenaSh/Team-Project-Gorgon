import { objectPagesController } from 'objectPagesController';
import { hotelDetailsController } from 'hotelDetailsController';
import { requester } from "requester";
import { userController } from "userController";
import Navigo from 'navigo';

const root = null;
const useHash = true;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

router
    .on('/hotelObjects/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController('app-container').displayTemplate('hotels', pageNumber, 'hotelsPage');
    })
    .on('/hotelObjects', function() {
        objectPagesController('app-container').displayTemplate('hotels', 1, 'hotelsPage');
    })
    .on('/restaurantObjects', function() {
        objectPagesController('app-container').displayTemplate('restaurants', 1, 'restaurantsPage');
    })
    .on('/restaurantObjects/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController('app-container').displayTemplate('restaurants', pageNumber, 'restaurantsPage');
    })
    .on('/sightseeingObjects', function() {
        objectPagesController('app-container').displayTemplate('sightseeing', 1, 'sightseeingPage');
    })
    .on('/sightseeingObjects/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController('app-container').displayTemplate('sightseeing', pageNumber, 'sightseeingPage');
    })
    .on('/test/:hotelName', function(params) {
        const hotelName = params.hotelName;
        hotelDetailsController('app-container').displayTemplate('hotels', 'hotelDetails');
    })
    .on('/', function() {
        objectPagesController('app-container').displayTemplate('objects', 1, 'mainPage');
    })
    .on('/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController('app-container').displayTemplate('objects', pageNumber, 'mainPage');
    });    
    

    

userController();

// TESTING PURPOSES
function registerUser(username, password) {
    const user = {
        username: username,
        passHash: "Hashed" + username + password
    };

    const promise = new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: 'api/users',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: response => resolve(response),
            error: response => reject(response)
        });
    });

    return promise;
}

function printResult(data) {
    console.log(data);
}

registerUser('User', 'password1')
    .then(printResult, printResult);

