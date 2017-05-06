import Navigo from 'navigo';
import { controllersFactory } from 'controllersFactory';

const root = null;
const useHash = true;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

const controllerFactory = controllersFactory();
const objectPagesController = controllerFactory.createObjectsPagesController();
const hotelDetailsController = controllerFactory.createHotelDetailsController();
const userController = controllerFactory.createUserController();

router
    .on('/hotelObjects/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController.displayContent('hotels', pageNumber, 'hotelsPage', '#app-container');
    })
    .on('/hotelObjects', function() {
        objectPagesController.displayContent('hotels', 1, 'hotelsPage', '#app-container');
    })
    .on('/restaurantObjects', function() {
        objectPagesController.displayContent('restaurants', 1, 'restaurantsPage', '#app-container');
    })
    .on('/restaurantObjects/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController.displayContent('restaurants', pageNumber, 'restaurantsPage', '#app-container');
    })
    .on('/sightseeingObjects', function() {
        objectPagesController.displayContent('sightseeing', 1, 'sightseeingPage', '#app-container');        
    })
    .on('/sightseeingObjects/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController.displayContent('sightseeing', pageNumber, 'sightseeingPage', '#app-container');  
    })
    .on('/test/:hotelName', function(params) {
        const hotelName = params.hotelName;
        hotelDetailsController.displayContent('hotels', hotelName, 'hotelDetails', '#app-container');
    })
    .on('/', function() {
        objectPagesController.displayContent('objects', 1, 'mainPage', '#app-container');
    })
    .on('/:pageNumber', function(params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController.displayContent('objects', 1, 'mainPage', '#app-container');
    });