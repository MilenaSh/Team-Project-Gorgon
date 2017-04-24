import { requester } from 'requester';

// TODO: caching of templates

const templates = function() {
    function loadTemplate(templateName) {
        return requester().getData(`/templates/${templateName}.handlebars`)
            .then((template) => {
                const compiledTemplate = Handlebars.compile(template);
                
                return Promise.resolve(compiledTemplate); 
            });
    }

    return {
        loadTemplate
    };
};

export { templates };