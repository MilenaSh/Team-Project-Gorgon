import Handlebars from 'handlebars';
import { requester } from 'requester';
import { helperRegister } from 'helperRegister';

// REGISTER TEMPLATE HELPERS
helperRegister().initHelpers();


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