import { requester } from 'requester';
import Handlebars from 'handlebars';

Handlebars.registerHelper('img', function (object) {
    const src = object;

    return new Handlebars.SafeString(
        "<img src='" + src + "'></img>"
    );
});

const templates = function () {
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