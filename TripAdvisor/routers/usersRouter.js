var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    // Register new user
    router.post('/', function(req, res) {
        const users = db.get('users');

        const userToRegister = req.body;

        const foundUser = users.find({
            username: userToRegister.username            
        }).value();

        if(foundUser) {
            res.status(401)
                .json("User with that name already exists");
            return;
        }

        users.insert(userToRegister)
            .write();

        res.json({
            username: userToRegister.username,
            userID: userToRegister.id
        });
    });

    // Authenticate user
    router.put('/', function(req, res) {
        const users = db.get('users');

        const userToLogIn = req.body;

        const foundUser = users.find({
            username: userToLogIn.username,
            passHash: userToLogIn.passHash
        }).value();

        if(!foundUser) {
            res.status(401)
                .json("Authentication failed.");
            return;
        }

        res.json({
            username: foundUser.username,
            userID: foundUser.id
        });
    });

    return router;
};