import 'jquery';
import Handlebars from 'handlebars';

const objectPagesController = function(objectsRequester, templateLoader) {
    const objRequester = objectsRequester;
    const loader = templateLoader;

    function displayContent(directory, page, templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName),
            objRequester.getObjectsPage(directory, page)
        ])
        .then(([template, data]) => {
            $(containerSelector).html(template(data));
        });
    }   

    return {
        displayContent: displayContent
    };
};

export { objectPagesController };