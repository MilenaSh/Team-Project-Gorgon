import 'jquery';
import { genericRequester } from 'genericRequester';

const objectsgenericRequester = function() {
    function getAllObjects(directory) {
        return genericRequester().get(directory);
    }

    function getObjectsPage(directory, pageNumber) {
        return genericRequester().get(`${directory}/${pageNumber}`)
    }

    function addNewObject(directory, objectData) {
        return genericRequester().post(directory, objectData);
    }

    function getSpecificObject(directory, name) {
        const searchParams = {
            name: name
        };

        return genericRequester().put(directory, searchParams);
    }

    function editSpecificObject(directory, name, info) {
        info['name'] = name;

        return genericRequester().patch(directory, info);
    }

    return {
        getAllObjects,
        getObjectsPage,
        addNewObject,
        getSpecificObject,
        editSpecificObject
    };
};

export { objectsgenericRequester };