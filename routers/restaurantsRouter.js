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
        restaurantToAdd.type = 'restaurant';

        const duplicatedRestaurant = db.get('restaurants')
            .find({name: restaurantToAdd.name});

        if (duplicatedRestaurant.value()) {
            res.status(400)
                .json("Restaurant with such name already exists");
            return;
        }

        const addingUser = db.get('users')
            .find({username: restaurantToAdd.addedBy});

        const adderItems = addingUser.value().added || [];
        adderItems.push({
            name: restaurantToAdd.name,            
        });

        addingUser.assign({added: adderItems})
            .write();

        db.get('restaurants')
            .insert(restaurantToAdd)
            .write();

        res.json("Succesfully added!");
    });

    // Get specific restaurant object
    router.put('/', function(req, res) {
        console.log(req.body);
        // Add logic for additional params (price, etc)
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

        const foundRestaurant = db.get('restaurants')
            .find(searchParam)
            .value();

        if(!foundRestaurant) {
            res.status(400)
                .json("Restaurant object with such parameters(name) doesnt exist");
                return;
        }

        res.json(foundRestaurant);
    });

    // Add comment/edit
    router.patch('/', function(req, res) {
        const searchedRestaurantId = req.body.id;

        const foundRestaurant = db.get('restaurants')
            .find({id: searchedRestaurantId});

        if(!foundRestaurant.value()) {
            res.status(400)
                .json("No restaurant with that ID found.");
            return;
        }

        // Editing
        if(!req.body.comment && !req.body.author) {
            foundRestaurant.assign(req.body)
                .write();
            res.json("Restaurant edited.");
            return;
        }

        // Adding comment
        const currentComments = foundRestaurant.value().comments || [];
        currentComments.push({
            author: req.body.author,
            text: req.body.text
        });

        foundRestaurant.assign({comments: currentComments})
            .write();

        res.json("Comment added.");
    });

    return router;
};