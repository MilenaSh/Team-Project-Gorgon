import { genericRequester } from 'genericRequester';
import { objectsRequester } from 'objectsRequester';
import { userRequester } from 'userRequester';
import { templateLoader } from 'templateLoader';
import { userValidator } from 'userValidator';
import { hotelDetailsController } from 'hotelDetailsController';
import { sightseeingDetailsController } from 'sightseeingDetailsController';
import { restaurantDetailsController } from 'restaurantDetailsController'; 
import { objectPagesController } from 'objectPagesController';
import { userController } from 'userController';

const controllersFactory = function() {
    // Extracted here in case we decide to extract dependancies here too
    const requester = genericRequester();
    const objRequester = objectsRequester(requester);
    const usrRequester = userRequester(requester);
    const loader = templateLoader(requester);
    const usrValidator = userValidator();

    function createHotelDetailsController() {
        return hotelDetailsController(objRequester, loader);
    }

//adding sightseeing controller function
    function createSightseeingDetailsController() {
        return sightseeingDetailsController(objRequester, loader);
    }

//adding restaurant controller function
    function createRestaurantDetailsController() {
        return restaurantDetailsController(objRequester, loader);
    }

    function createObjectsPagesController() {
        return objectPagesController(objRequester, loader);
    }

    function createUserController() {
        return userController(usrRequester, usrValidator);
    }

    return {
        createHotelDetailsController: createHotelDetailsController,
        createObjectsPagesController: createObjectsPagesController,
        createUserController: createUserController,
        createSightseeingDetailsController: createSightseeingDetailsController,
        createRestaurantDetailsController: createRestaurantDetailsController
    };
};

export { controllersFactory };