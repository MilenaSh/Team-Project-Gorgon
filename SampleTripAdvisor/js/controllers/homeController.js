import { requester } from 'requester';
import { templates } from 'templates';
import { firebaseParser } from 'firebaseParser';

const homeController = function() {
    function displayTemplate(dbDirectory, itemsCount) {
        Promise.all([
            templates().loadTemplate('home'),
            requester().getFirebaseData(dbDirectory, itemsCount)
        ])
            .then(([template, objects]) => {
                const data = firebaseParser().parseForTemplate(objects);
                console.log(data);
                $("#app-container").html(template(data));
            });
    }

    return {
        displayTemplate
    };
};

export { homeController };