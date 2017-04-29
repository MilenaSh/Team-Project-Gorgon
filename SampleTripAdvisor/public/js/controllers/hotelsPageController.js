import { templates } from 'templates';
import { objectsRequester } from 'objectsRequester';
import 'jquery';
import { dataParser } from 'dataParser';
import Handlebars from 'handlebars';

const hotelsPageController = function(containerID) {
    const container = $(`#${containerID}`);

    function displayTemplate(directory, page) {
        Promise.all([
            templates().loadTemplate('hotelPage'),
            objectsRequester().getObjectsPage(directory, page)
        ])
        .then(([template, data]) => {
            const parsedData = dataParser().parseHotelData(data);
            container.html(template(parsedData));
        });
    }   

    return {
        displayTemplate
    };
};

export { hotelsPageController };