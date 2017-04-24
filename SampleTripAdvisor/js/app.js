import { requester } from 'requester';

// Testing purposes
function printData(data) {
    console.log(data.val());
}

requester().getData('objects', 1).then(printData);