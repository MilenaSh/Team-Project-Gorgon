var express = require('express');

// TODO: fix formatting, get separate functions for validating, finding etc.

module.exports = function (db) {
    var router = express.Router();
    const DEFAULT_PAGE_SIZE = 5;

    // Get all sightseeing objects
    router.get('/', function (req, res) {
        // Get all sightseeing objects sorted alphabetically
        const sightseeings = db.get('sightseeing')
            .chain()
            .sortBy('name')
            .value();

        res.json(sightseeings);
    });

    // Get paged
    router.get('/:pageNumber', function (req, res) {
        const pageSize = DEFAULT_PAGE_SIZE || req.pageSize;
        const pageNumber = req.params.pageNumber;
        const sightseeingDB = db.get('sightseeing');

        // Page content would exceed the number of items
        if (pageSize * pageNumber - pageSize >= sightseeingDB.size()) {
            res.status(400)
                .json("No sightseeing objects on this page");
            return;
        }

        const startingIndex = pageNumber * pageSize - pageSize;
        const endingIndex = pageNumber * pageSize;

        const pagesCount = Math.ceil(sightseeingDB.value().length / pageSize);
        const pages = [];
        for(let i = 0; i < pagesCount; i += 1) {
            pages.push(i + 1);
        }

        // Sort hotels by name and get by indices based on page selected
        const resultObjects = sightseeingDB.chain()
            .sortBy('name')
            .slice(startingIndex, endingIndex)
            .value();

        res.json({
            sightseeing:resultObjects,
            pages: pages
        });
    });

    // Add new object
    router.post('/', function (req, res) {
        const objectToAdd = req.body;

        const duplicatedObject = db.get('sightseeing')
            .find({name: objectToAdd.name});

        if (duplicatedObject.value()) {
            res.status(400)
                .json("Sightseeing object with such name already exists");
            return;
        }

        db.get('sightseeing')
            .insert(objectToAdd)
            .write();

        res.json("Succesfully added!");
    });

    // Get specific sightseeing object
    router.put('/', function(req, res) {
        // Add logic for additional params (price, etc)
        const searchedObjectName = req.body.name;

        const foundObject = db.get('sightseeing')
            .find({name: searchedObjectName})
            .value();

        if(!foundObject) {
            res.status(400)
                .json("Sightseeing object with such parameters(name) doesnt exist");
                return;
        }

        res.json(foundObject);
    });

    // Edit sightseeing object properties
    router.patch('/', function(req, res) {
        const searchedObject = req.body;
        console.log(req.body);

        const foundObject = db.get('sightseeing')
            .find({name: searchedObject.name});

        if(!foundObject.value()) {
            res.status(400)
                .json("No sightseeing object with that name found");
            return;
        }

        foundObject.assign(searchedObject).write();
        res.json("Successfully edited.");
    });

    return router;
};