import { genericRequester } from 'genericRequester';
import { objectsRequester } from 'objectsRequester';
import { userRequester } from 'userRequester';
import { templateLoader } from 'templateLoader';
import { userValidator } from 'userValidator';
import { userController } from 'userController';
import { propertyValidator } from 'propertyValidator';
import { itemsController } from 'itemsController';
import { addItemValidator } from 'addItemValidator'

const controllersFactory = function() {
    // Extracted here in case we decide to extract dependancies here too
    const requester = genericRequester();
    const objRequester = objectsRequester(requester);
    const usrRequester = userRequester(requester);
    const loader = templateLoader(requester);
    const usrValidator = userValidator();
    const propValidator = propertyValidator();
    const itemValidator = addItemValidator();

    function createUserController() {
        return userController(usrRequester, objRequester, usrValidator, propValidator, loader);
    }

    function createItemsController() {
        return itemsController(objRequester, itemValidator, loader);
    }

    return {
        createUserController: createUserController,
        createItemsController: createItemsController
    };
};

export { controllersFactory };

// Orig