var express = require('express');

module.exports = function(db) {
    var router = express.Router();

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

    return router;
};