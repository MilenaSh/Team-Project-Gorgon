import Handlebars from 'handlebars';
import { helperRegister } from 'helperRegister';

// REGISTER TEMPLATE HELPERS
helperRegister().initHelpers();

const templateLoader = function (genericRequester) {
    const requester = genericRequester;

    // TODO: add caching
    function loadTemplate(templateName) {
        return requester.get(`templates/${templateName}.handlebars`)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);

                return Promise.resolve(compiledTemplate);
            });
    }

    return {
        loadTemplate: loadTemplate
    };
};

export { templateLoader };