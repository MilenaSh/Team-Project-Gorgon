const propertyValidator = function () {
    function validateProfilePictureLink(url) {
        const expression = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

        if (url.match(expression)) {
            return true;
        }

        return false;
    }

    return {
        validateProfilePictureLink: validateProfilePictureLink
    };
};

export {propertyValidator};