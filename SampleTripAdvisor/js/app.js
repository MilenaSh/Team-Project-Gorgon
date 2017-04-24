import { requester } from 'requester';
import { templates } from 'templates';
import { homeController } from 'homeController';
import { firebaseParser } from 'firebaseParser';

// Testing purposes
function printData(data) {
    // .val() needed for firebase data
    console.log(data.val());
    // regular data
    // console.log(data);
}

// requester().getFirebaseData('objects', 1).then(printData);
// requester().getFirebaseData('objects', 10).then(firebaseParser().parseForTemplate);

homeController().displayTemplate('objects', 10);