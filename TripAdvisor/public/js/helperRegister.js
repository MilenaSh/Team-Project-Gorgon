import Handlebars from 'handlebars';

// Init handlebars helpers

const helperRegister = function () {
    function initHelpers() {
        Handlebars.registerHelper('img', function (object) {
            const src = object;

            return new Handlebars.SafeString(
                "<img src='" + src + "'></img>"
            );
        });

        Handlebars.registerHelper('objectPage', function (pageNumber) {
            const link = pageNumber;

            return new Handlebars.SafeString(
                "<a href='#!/" + link + "'>" + link + "</a>"
            );
        });

        Handlebars.registerHelper('hotelPage', function (pageNumber) {
            const link = pageNumber;

            return new Handlebars.SafeString(
                "<a href='#!/hotels/" + link + "'>" + link + "</a>"
            );
        });

        Handlebars.registerHelper('restaurantPage', function (pageNumber) {
            const link = pageNumber;

            return new Handlebars.SafeString(
                "<a href='#!restaurants/" + link + "'>" + link + "</a>"
            );
        });

        Handlebars.registerHelper('sightseeingPage', function (pageNumber) {
            const link = pageNumber;

            return new Handlebars.SafeString(
                "<a href='#!sightseeing/" + link + "'>" + link + "</a>"
            );
        });
    }

    return {
        initHelpers: initHelpers
    };
};

export { helperRegister };