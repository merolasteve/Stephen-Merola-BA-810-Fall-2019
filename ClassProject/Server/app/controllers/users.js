'use strict' //forces you to use proper syntax
var express = require('express'),
    router = express.Router(), //router - object that does all routing
    logger = require('../../config/logger');
    mongoose = require('mongoose'),
    User = mongoose.model('User');
module.exports = function (app, config) {
    app.use('/api', router); //appends 'api' to all routes


    //Post Route example
    /*router.route('/users').post((req, res, next) => {
            logger.log('info', 'Create user');
            res.status(201).json({message: 'Created user'});*/



    router.route('/users').get((req, res, next) => { ///apis/users becasue api already appended above
        logger.log('info', 'Get all users'); //every route should have a log - info wont run in prod
        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json({ message: 'Got all users' }); //200 = a secussful get - temp, must be deleted later
                } else {
                    res.status(404).json({ message: "No users" });
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/users/login').post((req, res, next) => {
        logger.log('info', '%s logging in', req.body.email);
        var email = req.body.email
        var password = req.body.password;
        var obj = { 'email': email, 'password': password };
        res.status(201).json(obj);
    });

    router.route('/users/:id').get((req, res, next) => {
        logger.log('info', 'Get user %s', req.params.id);
        res.status(200).json({ id: req.params.id });
    });

    router.route('/users').post((req, res, next) => {
        logger.log('info', 'Create user');
        var user = new User(req.body);
        user.save()
            .then(result => {
                res.status(201).json({ message: 'Created user' });
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/test/:id/:name').get((req, res, next) => {
        var id = req.params.id;
        var name = req.params.name;
        var obj = { 'id': id, ' name ': name };
        res.status(200).json(obj);
    });

};