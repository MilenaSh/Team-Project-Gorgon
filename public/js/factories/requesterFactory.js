import { genericRequester } from 'genericRequester';
import { objectsRequester } from 'objectsRequester';
import { userRequester } from 'userRequester';

const requesterFactory = function() {
    function createGenericRequester() {
        return genericRequester();
    }

    function createObjectsRequester() {
        return objectsRequester(genericRequester());
    }

    function createUserRequester() {
        return userRequester(genericRequester());
    }

    return {
        createGenericRequester: createGenericRequester,
        createObjectsRequester: createObjectsRequester,
        createUserRequester: createUserRequester
    };
};

export { requesterFactory };