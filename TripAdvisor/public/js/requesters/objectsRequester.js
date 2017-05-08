const objectsRequester = function(genericRequester) {
    const requester = genericRequester;

    function getObjectsPage(directory, pageNumber) {
        return requester.get(`${directory}/${pageNumber}`)
    }

    function addNewObject(directory, objectData) {
        return requester.post(directory, objectData);
    }

    function getSpecificObject(directory, searchParams) {
        return requester.put(directory, searchParams);
    }

    function editSpecificObject(directory, info) {
        return requester.patch(directory, info);
    }

    // more

    return {
        getObjectsPage: getObjectsPage,
        addNewObject: addNewObject,
        getSpecificObject: getSpecificObject,
        editSpecificObject: editSpecificObject
    };
};

export { objectsRequester };