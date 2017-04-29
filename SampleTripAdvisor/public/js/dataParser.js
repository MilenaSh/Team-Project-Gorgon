const dataParser = function() {
    function parseHotelData(data) {
        // TODO: add pages to the object

        const result = {
            hotels: data
        };

        return result;
    }

    return {
        parseHotelData
    };
}

export { dataParser };