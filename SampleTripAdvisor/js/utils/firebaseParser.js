const firebaseParser = function() {
    function parseForTemplate(data) {
        let result = { 'objects' : [] };
        // since first entry is undefined
        let len = data.val().length;
        for(let i = 1; i < len; i += 1) {
            
            result['objects'].push({
                'name': data.val()[i].name,
                'city': data.val()[i].city
            });
        }

        return result;        
    }

    return {
        parseForTemplate
    };
};

export { firebaseParser };