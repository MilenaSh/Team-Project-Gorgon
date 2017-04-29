import { objectPagesController } from 'objectPagesController';
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
    .on('/', function() {
        objectPagesController('app-container').displayTemplate('objects', 1, 'mainPage');
    })
    .on('/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController('app-container').displayTemplate('objects', pageNumber, 'mainPage');
    });