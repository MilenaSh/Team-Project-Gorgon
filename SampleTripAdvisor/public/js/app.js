import { mainPageController } from 'mainPageController';
import { hotelsPageController } from 'hotelsPageController';
import { restaurantsPageController } from 'restaurantsPageController';
import { sightseeingPageController } from 'sightseeingPageController';
import Navigo from 'navigo';

// hotelsPageController('app-container').displayTemplate('objects', 3);

const root = null;
const useHash = true;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

router
    .on('/hotelObjects/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        hotelsPageController('app-container').displayTemplate('hotels', pageNumber);
    })
    .on('/hotelObjects', function() {
        hotelsPageController('app-container').displayTemplate('hotels', 1);
    })
    .on('/restaurantObjects', function() {
        restaurantsPageController('app-container').displayTemplate('restaurants', 1);
    })
    .on('/restaurantObjects/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        restaurantsPageController('app-container').displayTemplate('restaurants', pageNumber);
    })
    .on('/sightseeingObjects', function() {
        sightseeingPageController('app-container').displayTemplate('sightseeing', 1);
    })
    .on('/sightseeingObjects/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        sightseeingPageController('app-container').displayTemplate('sightseeing', pageNumber);
    })
    .on('/', function() {
        mainPageController('app-container').displayTemplate('objects', 1);
    })
    .on('/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        mainPageController('app-container').displayTemplate('objects', pageNumber);
    });