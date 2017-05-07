const objectsRequester = function(genericRequester) {
    const requester = genericRequester;

    function getAllObjects(directory) {
        return requester.get(directory);
    }

    function getObjectsPage(directory, pageNumber) {
        return requester.get(`${directory}/${pageNumber}`)
    }

    function addNewObject(directory, objectData) {
        return requester.post(directory, objectData);
    }

    function getSpecificObject(directory, searchParams) {
        return requester.put(directory, searchParams);
    }

    function editSpecificObject(directory, name, info) {
        info['name'] = name;

        return requester.patch(directory, info);
    }

    return {
        getAllObjects: getAllObjects,
        getObjectsPage: getObjectsPage,
        addNewObject: addNewObject,
        getSpecificObject: getSpecificObject,
        editSpecificObject: editSpecificObject
    };
};

export { objectsRequester };