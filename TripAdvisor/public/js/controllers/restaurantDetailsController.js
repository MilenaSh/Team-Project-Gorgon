import 'jquery';
import Handlebars from 'handlebars';
import toastr from 'toastr';

// Consider implementing a class
const restaurantDetailsController = function (objectsRequester, templateLoader) {
    // Add validations if provider is null
    const objRequester = objectsRequester;
    const loader = templateLoader;

    function displayContent(directory, restaurantName, templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName),
            objRequester.getSpecificObject(directory, restaurantName)
        ]).then(([template, data]) => {
            $(containerSelector).html(template(data));
        }).then(() => {
            $('#add-comment-btn')
                .on('click', function (ev) {
                    console.log("Called");
                    let author = localStorage.getItem('username');
                    let commentText = $('#comment-input-field')
                        .val()
                        .trim();
                    // improve validation
                    if (commentText.length !== 0 && author) {
                        let hotelId = location.hash.split('/')[2];
                        addComment(hotelId, author, commentText)
                            .then(() => {
                                toastr.success('Comment added.');
                            })
                            .then(displayContent(directory, restaurantName, templateName, containerSelector));
                    }
                });
        });
    }

    // 1. replace with requester function later
    // 2. implement for all types of objects after merging duplicating code
    function addComment(objectId, author, text) {
        const comment = {
            id: objectId,
            author: author,
            text: text
        };

        const promise = new Promise((resolve, reject) => {
            $.ajax({
                method: 'PATCH',
                url: 'api/hotels',
                contentType: 'application/json',
                data: JSON.stringify(comment),
                success: response => resolve(response)
            });
        });

        return promise;
    }

    return {displayContent: displayContent};
};

export {restaurantDetailsController};