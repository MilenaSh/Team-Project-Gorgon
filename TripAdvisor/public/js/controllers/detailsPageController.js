import 'jquery';
import Handlebars from 'handlebars';
import toastr from 'toastr';

// Consider implementing a class
const detailsPageController = function (objectsRequester, templateLoader) {
    // Add validations if provider is null
    const objRequester = objectsRequester;
    const loader = templateLoader;

    function displayContent(directory, searchParams, templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName),
            objRequester.getSpecificObject(directory, searchParams)
        ]).then(([template, data]) => {
            $(containerSelector).html(template(data));
            return Promise.resolve(data.type);
        }).then((itemType) => {
            // dafuk
            let dbDirectory;
            switch (itemType) {
                case 'hotel':
                    dbDirectory = 'hotels';
                    break;                
                case 'restaurant':
                    dbDirectory = 'restaurants';
                    break;                
                case 'sightseeing':
                    dbDirectory = 'sightseeing';
                    break;            
                default:
                    break;
            }
            $('#add-comment-btn')
                .on('click', function (ev) {
                    console.log("Called");
                    let author = localStorage.getItem('username') || sessionStorage.getItem('username');
                    let commentText = $('#comment-input-field')
                        .val()
                        .trim();
                    // improve validation
                    if (commentText.length !== 0 && author) {
                        let hotelId = location.hash.split('/')[2];
                        addComment(dbDirectory, hotelId, author, commentText)
                            .then(() => {
                                toastr.success('Comment added.');
                            })
                            .then(displayContent(directory, searchParams, templateName, containerSelector));
                    }
                    else {
                        toastr.error('Invalid message or not logged in.');
                    }
                });
        });
    }

    // 1. replace with requester function later
    // 2. implement for all types of objects after merging duplicating code
    function addComment(directory, objectId, author, text) {
        const comment = {
            id: objectId,
            author: author,
            text: text
        };

        return objRequester.editSpecificObject('api/' + directory, comment);
    }

    return {displayContent: displayContent};
};

export { detailsPageController };