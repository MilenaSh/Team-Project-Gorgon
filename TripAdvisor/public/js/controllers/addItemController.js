import 'jquery';
import Handlebars from 'handlebars';

const addItemController = function(objectsRequester, templateLoader) {
    const objRequester = objectsRequester;
    const loader = templateLoader;

    function displayContent(templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName)
        ])
        .then(([template]) => {
            $(containerSelector).html(template());
        });
    }   

    // Add button click events, validation of input, different add logic for different type of item

    return {
        displayContent: displayContent
    };
};

export { addItemController };