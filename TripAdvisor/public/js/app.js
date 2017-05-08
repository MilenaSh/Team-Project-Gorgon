import Navigo from 'navigo';
import { controllersFactory } from 'controllersFactory';
import 'jquery';

const root = null;
const useHash = true;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

const controllerFactory = controllersFactory();
const objectPagesController = controllerFactory.createObjectsPagesController();
const userController = controllerFactory.createUserController();
const detailsPageController = controllerFactory.createDetailsPageController();
const userProfileController = controllerFactory.createUserProfileController();
const createItemController = controllerFactory.createAddItemController();



router
    .on('/hotels/:pageNumber', function (params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController.displayContent('api/hotels', pageNumber, 'hotelsPage', '#app-container');
    })
    .on('/hotels', function () {
        objectPagesController.displayContent('api/hotels', 1, 'hotelsPage', '#app-container');
    })
    .on('/restaurants', function () {
        objectPagesController.displayContent('api/restaurants', 1, 'restaurantsPage', '#app-container');
    })
    .on('/restaurants/:pageNumber', function (params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController.displayContent('api/restaurants', pageNumber, 'restaurantsPage', '#app-container');
    })
    .on('/sightseeing', function () {
        objectPagesController.displayContent('api/sightseeing', 1, 'sightseeingPage', '#app-container');
    })
    .on('/sightseeing/:pageNumber', function (params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController.displayContent('api/sightseeing', pageNumber, 'sightseeingPage', '#app-container');
    })
    .on('/objects/:searchParam', function (params) {
        // 1. Better naming after establishing what to search by
        // 2. if-else in separate function
        let searchParams = {};
        if(params.searchParam.indexOf("-") !== -1) {
            searchParams = {id: params.searchParam };
        }
        else if(params.searchParam.indexOf("-") === -1){
            searchParams = {name: params.searchParam};
        }

        console.log(searchParams);
        detailsPageController.displayContent('api/all', searchParams, 'itemDetails', '#app-container');
    })
    .on('/users/:username', function(params) {
        const username = params.username;
        userProfileController.displayContent('api/users', username, 'userProfile', '#app-container');
    })
    .on('/add', function() {
        createItemController.displayContent('addNewItem', '#app-container');
    })
    .on('/', function () {
        objectPagesController.displayContent('api/all', 1, 'mainPage', '#app-container');
    })
    .on('/:pageNumber', function (params) {
        const pageNumber = params.pageNumber || 1;
        objectPagesController.displayContent('api/all', pageNumber, 'mainPage', '#app-container');
    })
    .resolve();

