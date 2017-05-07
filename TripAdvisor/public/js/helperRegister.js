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

        Handlebars.registerHelper('buttonsLinks', function(url) {

            return new Handlebars.SafeString(
                "<p><a href='#!/restaurantTest/" + url + "' class='btn btn-primary' role='button'>View details</a> <a href='#' class'btn btn-default' role='button'>Make a Reservation</a></p>"
            );
        });
    }

    return {
        initHelpers: initHelpers
    };
};

export { helperRegister };