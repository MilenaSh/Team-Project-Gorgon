import 'jquery';
import Handlebars from 'handlebars';
import { templates } from 'templates';
import { objectsRequester } from 'objectsRequester';

//TODO: fix express 

const hotelDetailsController = function(containerID) {
    const container = $(`#${containerID}`);

    function displayTemplate(directory, templateName) {
        Promise.all([
            templates().loadTemplate(templateName),
            objectsRequester().getSpecificObject('/hotels', "Hotel1")
        ])
        .then(([template, data]) => {
            container.html(template(data));
        });
    }   

    return {
        displayTemplate 
    };
};

export { hotelDetailsController };