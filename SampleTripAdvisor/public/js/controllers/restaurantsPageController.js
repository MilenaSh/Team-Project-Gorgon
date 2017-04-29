import { templates } from 'templates';
import { objectsRequester } from 'objectsRequester';
import 'jquery';
import { dataParser } from 'dataParser';
import Handlebars from 'handlebars';

const restaurantsPageController = function(containerID) {
    const container = $(`#${containerID}`);

    function displayTemplate(directory, page) {
        Promise.all([
            templates().loadTemplate('restaurantsPage'),
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

export { restaurantsPageController };