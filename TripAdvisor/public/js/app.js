/**
 * @param {{pageNumber:number}} params
 */

import { UserRouter } from 'userRouter'
import { objectPagesController } from 'objectPagesController';
import { requester } from "requester"
import Navigo from 'navigo';
import * as userController from 'userController';

const root = null;
const useHash = true;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

const userRouter = new UserRouter();

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

userRouter
    .on('/auth', userController.get)
    .on('/login', userController.login)
    .on('/register', userController.register)
    .on('/logout', userController.logout);


