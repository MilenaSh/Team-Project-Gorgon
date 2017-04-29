import { requester } from 'requester';
import Handlebars from 'handlebars';

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
        "<a href='#!/hotelObjects/" + link + "'>" + link + "</a>"
    );
});

Handlebars.registerHelper('restaurantPage', function (pageNumber) {
    const link = pageNumber;

    return new Handlebars.SafeString(
        "<a href='#!/restaurantObjects/" + link + "'>" + link + "</a>"
    );
});

Handlebars.registerHelper('sightseeingPage', function (pageNumber) {
    const link = pageNumber;

    return new Handlebars.SafeString(
        "<a href='#!/sightseeingObjects/" + link + "'>" + link + "</a>"
    );
});

const templates = function () {
    // TODO: add caching
    function loadTemplate(templateName) {
        return requester().get(`templates/${templateName}.handlebars`)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);

                return Promise.resolve(compiledTemplate);
            });
    }

    return {
        loadTemplate
    };
};

export {
    templates
};