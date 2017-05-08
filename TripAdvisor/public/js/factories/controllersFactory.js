import { genericRequester } from 'genericRequester';
import { objectsRequester } from 'objectsRequester';
import { userRequester } from 'userRequester';
import { templateLoader } from 'templateLoader';
import { userValidator } from 'userValidator';
import { detailsPageController } from 'detailsPageController'; 
import { objectPagesController } from 'objectPagesController';
import { userController } from 'userController';
import { addItemController } from 'addItemController';
import { propertyValidator } from 'propertyValidator';

const controllersFactory = function() {
    // Extracted here in case we decide to extract dependancies here too
    const requester = genericRequester();
    const objRequester = objectsRequester(requester);
    const usrRequester = userRequester(requester);
    const loader = templateLoader(requester);
    const usrValidator = userValidator();
    const propValidator = propertyValidator();

    function createDetailsPageController() {
        return detailsPageController(objRequester, loader);
    }

    function createObjectsPagesController() {
        return objectPagesController(objRequester, loader);
    }

    function createUserController() {
        return userController(usrRequester, objRequester, usrValidator, propValidator, loader);
    }

    function createAddItemController() {
        return addItemController(objRequester, loader);
    }

    return {
        createObjectsPagesController: createObjectsPagesController,
        createUserController: createUserController,
        createDetailsPageController: createDetailsPageController,
        createAddItemController: createAddItemController
    };
};

export { controllersFactory };

// Orig