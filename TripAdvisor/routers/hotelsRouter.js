var express = require('express');

// TODO: fix formatting, get separate functions for validating, finding etc.

module.exports = function (db) {
    var router = express.Router();
    var DEFAULT_PAGE_SIZE = 5;

    // Get all hotels
    router.get('/', function (req, res) {
        // Get all hotels sorted alphabetically
        const resultHotels = db.get('hotels')
            .chain()
            .sortBy('name')
            .value();

        res.json(resultHotels);
    });

    // Get hotels by page
    router.get('/:pageNumber', function (req, res) {
        const pageSize = DEFAULT_PAGE_SIZE || req.pageSize;
        const pageNumber = req.params.pageNumber;
        const hotelsDB = db.get('hotels');
        // Page content would exceed the number of items
        if (pageSize * pageNumber - pageSize >= hotelsDB.size()) {
            res.status(400)
                .json("No hotels on this page");
            return;
        }

        const startingIndex = pageNumber * pageSize - pageSize;
        const endingIndex = pageNumber * pageSize;

        const pagesCount = Math.ceil(hotelsDB.value().length / pageSize);
        const pages = [];
        for(let i = 0; i < pagesCount; i += 1) {
            pages.push(i + 1);
        }


        // Sort hotels by name and get by indices based on page selected
        const resultHotels = hotelsDB.chain()
            .sortBy('name')
            .slice(startingIndex, endingIndex)
            .value();

        res.json({
            hotels: resultHotels,
            pages: pages
        });
    });

    // Add new hotel
    router.post('/', function (req, res) {
        const hotelToAdd = req.body;

        const duplicatingHotel = db.get('hotels')
            .find({name: hotelToAdd.name});

        if (duplicatingHotel.value()) {
            res.status(400)
                .json("Hotel with such name already exists");
            return;
        }

        db.get('hotels')
            .insert(hotelToAdd)
            .write();

        res.json("Successfully added!");
    });

    // Get specific hotel
    router.put('/', function(req, res) {
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

        const foundHotel = db.get('hotels')
            .find(searchParam)
            .value();

        if(!foundHotel) {
            res.status(400)
                .json("Hotel with such parameters(name) doesn't exist");
                return;
        }

        res.json(foundHotel);
    });

    // Edit hotel properties
    router.patch('/', function(req, res) {
        const searchedHotel = req.body;
        console.log(req.body);

        const foundHotel = db.get('hotels')
            .find({name: searchedHotel.name});

        if(!foundHotel.value()) {
            res.status(400)
                .json("No hotel with that name found");
            return;
        }

        foundHotel.assign(searchedHotel).write();
        res.json("Successfully edited.");
    });

    return router;
};