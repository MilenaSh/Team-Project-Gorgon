var express = require('express');

// TODO: fix formatting, get separate functions for validating, finding etc.

module.exports = function (db) {
    var router = express.Router();
    var DEFAULT_PAGE_SIZE = 5;
    
    router.get('/:pageNumber', function (req, res) {
        const pageNumber = req.params.pageNumber;
        const pageSize = req.body.pageSize || DEFAULT_PAGE_SIZE;

        const hotels = db.get('hotels').value();
        const restaurants = db.get('restaurants').value();
        const sightseeing = db.get('sightseeing').value();
        
        const allObjects = hotels.concat(restaurants, sightseeing);

        allObjects.sort((a, b) => {
            if(a.name > b.name) {
                return 1;
            }
            else if(a.name < b.name) {
                return -1;
            }
            else {
                return 0;
            }
        });

        if (pageSize * pageNumber - pageSize >= allObjects.length) {
            res.status(400)
                .json("No objects on this page");
            return;
        }

        const startingIndex = pageNumber * pageSize - pageSize;
        const endingIndex = pageNumber * pageSize;

        const pagesCount = Math.ceil(allObjects.length / pageSize);
        const pages = [];
        for(let i = 0; i < pagesCount; i += 1) {
            pages.push(i + 1);
        }


        const result = allObjects
            .slice(startingIndex, endingIndex);

        res.json({
            objects: result,
            pages: pages
        });
    });

    // Get specific by id or name
    router.put('/', function(req, res) {
        let searchParam = {};

        if(req.body.id) {
            searchParam = {
                id: req.body.id
            };
        }
        else if(req.body.name) {
            searchParam = {
                name: req.body.name
            };
        }

        const foundHotel = db.get('hotels')
            .find(searchParam)
            .value();
        if(foundHotel) {
            res.json(foundHotel);
            return;
        }

        const foundRestaurant = db.get('restaurants')
            .find(searchParam)
            .value();
        if(foundRestaurant) {
            res.json(foundRestaurant);
            return;
        }

        const foundSightseeing = db.get('sightseeing')
            .find(searchParam)
            .value();
        if(foundSightseeing) {
            res.json(foundSightseeing);
            return;
        }

        res.status(400)
            .json('No such object found');
    });

    // Search for object(s) by name
    router.search('/', function(req, res) {
        const searchName = req.body.name;
        const result = [];

        const hotels = db.get('hotels').value();
        const restaurants = db.get('restaurants').value();
        const sightseeing = db.get('sightseeing').value();

        hotels.forEach(hotel => {
            if(hotel.name.indexOf(searchName) !== -1) {
                result.push(hotel);
            }
        });

        restaurants.forEach(restaurant => {
            if(restaurant.name.indexOf(searchName) !== -1) {
                result.push(restaurant);
            }
        });

        sightseeing.forEach(sight => {
            if(sight.name.indexOf(sight) !== -1) {
                result.push(sight);
            }
        });

        res.json(result);
    });

    return router;
};