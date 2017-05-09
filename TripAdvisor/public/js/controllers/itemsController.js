import 'jquery';
import Handlebars from 'handlebars';
import toastr from 'toastr';


const itemsController = function (objectRequester, addItemValidator, templateLoader) {
    const objRequester = objectRequester;
    const validator = addItemValidator;
    const loader = templateLoader;

    function displayAddItemPage(templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName)
        ])
            .then(([template]) => {
                $(containerSelector).html(template());
            })
            .then(() => {
                $('#add-item-btn').on('click', function (ev) {
                    const category = $('#type-selection').val().toLowerCase();

                    // validate fields
                    const item = {
                        "name": $('#item-name').val().trim(),
                        "description": $('#item-description').val().trim(),
                        "phone": $('#item-phone').val().trim(),
                        "address": $('#item-address').val().trim(),
                        "e-mail": $('#item-email').val().trim(),
                        "imageOne": $('#item-main-image').val().trim(),
                        "imageTwo": $('#item-second-image').val().trim(),
                        "imageThree": $('#item-third-image').val().trim(),
                        "imageFour": $('#item-fourth-image').val().trim(),
                        "imageFive": $('#item-fifth-image').val().trim(),
                        "addedBy": localStorage.getItem('username') || sessionStorage.getItem('username')
                    };

                    try {
                        validator.validateItem(item);
                        addItem(item, category)
                            .then(toastr.success('Item added!'));
                    }
                    catch (err) {
                        toastr.error(err);
                    }

                });
            });
    }

    function displayItemDetailsPage(directory, searchParams, templateName, containerSelector) {
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
                            .then(displayItemDetailsPage(directory, searchParams, templateName, containerSelector));
                    }
                    else {
                        toastr.error('Invalid message or not logged in.');
                    }
                });
        });
    }

    function displayPagedList(directory, page, templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName),
            objRequester.getObjectsPage(directory, page)
        ])
            .then(([template, data]) => {
                $(containerSelector).html(template(data));
            });
    }

    function addItem(item, itemCategory) {
        // add validations for picture link (to be actual link), names etc etc
        let directory;
        if (itemCategory === 'hotel') {
            directory = 'hotels';
        }
        else if (itemCategory === 'sightseeing') {
            directory = 'sightseeing';
        }
        else if (itemCategory === 'restaurant') {
            directory = 'restaurants';
        }

        return objRequester.addNewObject('api/' + directory, item);
    }

    function addComment(directory, objectId, author, text) {
        const comment = {
            id: objectId,
            author: author,
            text: text
        };

        return objRequester.editSpecificObject('api/' + directory, comment);
    }

    $('#search-btn').on('click', function (ev) {
        console.log('called');
        const searchedName = $('#search-input-field').val().trim();

        Promise.all([
            loader.loadTemplate('mainPage'),
            objRequester.searchAllObjects(searchedName)
        ])
            .then(([template, data]) => {
                const objects = {
                    objects: data
                };
                $('#app-container').html(template(objects));
            });
    });

    return {
        displayAddItemPage: displayAddItemPage,
        displayItemDetailsPage: displayItemDetailsPage,
        displayPagedList: displayPagedList
    };
}

export {itemsController};