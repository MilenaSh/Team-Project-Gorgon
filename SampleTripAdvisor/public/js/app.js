import { hotelsPageController } from 'hotelsPageController';
import Navigo from 'navigo';

// hotelsPageController('app-container').displayTemplate('objects', 3);

const root = null;
const useHash = true;
const hash = '#!';
const router = new Navigo(root, useHash, hash);

router
    .on('/', function() {
        hotelsPageController('app-container').displayTemplate('objects', 1);
    })
    .on('/:pageNumber', function(params) {
        let pageNumber = +params.pageNumber;

        hotelsPageController('app-container').displayTemplate('objects', pageNumber);
    });