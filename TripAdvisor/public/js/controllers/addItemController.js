import 'jquery';
import Handlebars from 'handlebars';
import toastr from 'toastr';

const addItemController = function(objectsRequester, templateLoader) {
    const objRequester = objectsRequester;
    const loader = templateLoader;

    function displayContent(templateName, containerSelector) {
        Promise.all([
            loader.loadTemplate(templateName)
        ])
        .then(([template]) => {
            $(containerSelector).html(template());
        })
        .then(() => {
            $('#add-item-btn').on('click', function(ev) {
                const category = $('#type-selection').val().toLowerCase();
                
                const item = {
                    "name": $('#item-name').val().trim(),
                    "description": $('#item-description').val().trim(),
                    "phone": $('#item-phone').val().trim(),
                    "address": $('#item-address').val().trim(),
                    "e-mail": $('#item-email').val().trim(),
                    "imageOne":  $('#item-main-image').val().trim(),
                    "imageTwo": $('#item-second-image').val().trim(),
                    "imageThree":  $('#item-third-image').val().trim(),
                    "imageFour":  $('#item-fourth-image').val().trim(),
                    "imageFive":  $('#item-fifth-image').val().trim(),
                    "addedBy": localStorage.getItem('username') || sessionStorage.getItem('username')
                };

                addItem(item, category)
                    .then(toastr.success('Item added!'));
            });
        });
    }   

    function addItem(item, itemCategory) {
        // add validations for picture link (to be actual link), names etc etc
        let directory;
        if(itemCategory === 'hotel') {
            directory = 'hotels';
        }
        else if(itemCategory === 'sightseeing') {
            directory = 'sightseeing';
        }
        else if(itemCategory === 'restaurant') {
            directory = 'restaurants';
        }

        return objectsRequester.addNewObject('api/' + directory, item);
    }

    return {
        displayContent: displayContent
    };
};

export { addItemController };