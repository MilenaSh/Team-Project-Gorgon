import Navigo from 'navigo';
import { controllersFactory } from 'controllersFactory';
import 'jquery';

const root = null;
const useHash = true;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

const controllerFactory = controllersFactory();
const userController = controllerFactory.createUserController();
const itemsController = controllerFactory.createItemsController();



router
    .on('/hotels/:pageNumber', function (params) {
        const pageNumber = params.pageNumber || 1;
        itemsController.displayPagedList('api/hotels', pageNumber, 'hotelsPage', '#app-container');
    })
    .on('/hotels', function () {
        itemsController.displayPagedList('api/hotels', 1, 'hotelsPage', '#app-container');
    })
    .on('/restaurants/:pageNumber', function (params) {
        const pageNumber = params.pageNumber || 1;
        itemsController.displayPagedList('api/restaurants', pageNumber, 'restaurantsPage', '#app-container');
    })
    .on('/restaurants', function () {
        itemsController.displayPagedList('api/restaurants', 1, 'restaurantsPage', '#app-container');
    })
    .on('/sightseeing/:pageNumber', function (params) {
        const pageNumber = params.pageNumber || 1;
        itemsController.displayPagedList('api/sightseeing', pageNumber, 'sightseeingPage', '#app-container');
    })
    .on('/sightseeing', function () {
        itemsController.displayPagedList('api/sightseeing', 1, 'sightseeingPage', '#app-container');
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

        itemsController.displayItemDetailsPage('api/all', searchParams, 'itemDetails', '#app-container');
    })
    .on('/users/:username', function(params) {
        const username = params.username;
        userController.displayProfilePage(username, 'userProfile', '#app-container');
    })
    .on('/add', function() {
        itemsController.displayAddItemPage('addNewItem', '#app-container');
    })
    .on('/editUser', function() {
        userController.displayEditPage('editUserProfile', '#app-container');
    })
    .on('/', function () {
        itemsController.displayPagedList('api/all', 1, 'mainPage', '#app-container');
    })
    .on('/:pageNumber', function (params) {
        const pageNumber = params.pageNumber || 1;
        itemsController.displayPagedList('api/all', pageNumber, 'mainPage', '#app-container');
    })
    .resolve();


