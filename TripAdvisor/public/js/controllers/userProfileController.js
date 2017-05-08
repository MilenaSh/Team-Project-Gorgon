import 'jquery';
import Handlebars from 'handlebars';

// Consider implementing a class
const userProfileController = function(genericRequester, templateLoader) {
    // Add validations if provider is null
    const requester = genericRequester;
    const loader = templateLoader;

    function displayContent(directory, userName, templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName),
            requester.get(directory + '/' + userName)
        ])
        .then(([template, data]) => {
            $(containerSelector).html(template(data));
        });
    }   

    return {
        displayContent: displayContent 
    };
};

export { userProfileController };