import 'jquery';
import Handlebars from 'handlebars';

// Consider implementing a class
const sightseeingDetailsController = function(objectsRequester, templateLoader) {
    // Add validations if provider is null
    const objRequester = objectsRequester;
    const loader = templateLoader;

    function displayContent(directory, sightseeingName, templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName),
            objRequester.getSpecificObject(directory, sightseeingName)
        ])
        .then(([template, data]) => {
            $(containerSelector).html(template(data));
        });
    }   

    return {
        displayContent: displayContent 
    };
};

export { sightseeingDetailsController };