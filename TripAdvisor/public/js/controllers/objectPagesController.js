import 'jquery';
import Handlebars from 'handlebars';
import { templates } from 'templates';
import { objectsRequester } from 'objectsRequester';

const objectPagesController = function(containerID) {
    const container = $(`#${containerID}`);

    function displayTemplate(directory, page, templateName) {
        Promise.all([
            templates().loadTemplate(templateName),
            objectsRequester().getObjectsPage(directory, page)
        ])
        .then(([template, data]) => {
            container.html(template(data));
        });
    }   

    return {
        displayTemplate
    };
};

export { objectPagesController };