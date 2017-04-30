var express = require('express');

// TODO: fix formatting, get separate functions for validating, finding etc.

module.exports = function (db) {
    var router = express.Router();
    const DEFAULT_PAGE_SIZE = 5;

    // Get all restaurants
    router.get('/', function (req, res) {
        // Get all restaurant objects sorted alphabetically
        const restaurants = db.get('restaurants')
            .chain()
            .sortBy('name')
            .value();

        res.json(restaurants);
    });

    // Get paged
    router.get('/:pageNumber', function (req, res) {
        const pageSize = DEFAULT_PAGE_SIZE || req.pageSize;
        const pageNumber = req.params.pageNumber;
        const restaurantsDB = db.get('restaurants');

        // Page content would exceed the number of items
        if (pageSize * pageNumber - pageSize >= restaurantsDB.size()) {
            res.status(400)
                .json("No restaurant objects on this page");
            return;
        }

        const startingIndex = pageNumber * pageSize - pageSize;
        const endingIndex = pageNumber * pageSize;

        const pagesCount = Math.ceil(restaurantsDB.value().length / pageSize);
        const pages = [];
        for(let i = 0; i < pagesCount; i += 1) {
            pages.push(i + 1);
        }

        // Sort hotels by name and get by indices based on page selected
        const resultRestaurants = restaurantsDB.chain()
            .sortBy('name')
            .slice(startingIndex, endingIndex)
            .value();

        res.json({
            restaurants:resultRestaurants,
            pages: pages
        });
    });

    // Add new restaurant
    router.post('/', function (req, res) {
        const restaurantToAdd = req.body;

        const duplicatedRestaurant = db.get('restaurants')
            .find({name: restaurantToAdd.name});

        if (duplicatedRestaurant.value()) {
            res.status(400)
                .json("Restaurant with such name already exists");
            return;
        }

        db.get('restaurants')
            .insert(restaurantToAdd)
            .write();

        res.json("Succesfully added!");
    });

    // Get specific restaurant object
    router.put('/', function(req, res) {
        // Add logic for additional params (price, etc)
        const searchedRestaurantName = req.body.name;

        const foundRestaurant = db.get('restaurants')
            .find({name: searchedRestaurantName})
            .value();

        if(!foundRestaurant) {
            res.status(400)
                .json("Restaurant object with such parameters(name) doesnt exist");
                return;
        }

        res.json(foundRestaurant);
    });

    // Edit sightseeing object properties
    router.patch('/', function(req, res) {
        const searchedRestaurant = req.body;
        console.log(req.body);

        const foundRestaurant = db.get('restaurants')
            .find({name: searchedRestaurant.name});

        if(!foundRestaurant.value()) {
            res.status(400)
                .json("No restaurant object with that name found");
            return;
        }

        foundRestaurant.assign(searchedRestaurant).write();
        res.json("Successfully edited.");
    });

    return router;
};