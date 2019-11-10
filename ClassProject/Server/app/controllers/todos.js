'use strict' //forces you to use proper syntax
var express = require('express'),
    router = express.Router(), //router - object that does all routing
    logger = require('../../config/logger');
    mongoose = require('mongoose'),
    Todo = mongoose.model('Todo');


module.exports = function (app, config) {
    app.use('/api', router); //appends 'api' to all routes

    //routes do here - watch brackets!!!
    router.route('/todos').get((req, res, next) => {
        logger.log('info', 'Get all todos');
        var query = Todo.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No todos" });
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/todos').post((req, res, next) => {
        logger.log('info', 'Create user');
        res.status(201).json({ message: 'Created user' });
    });

    router.route('/todos/:id').get((req, res, next) => {
        logger.log('info', 'Get user %s', req.params.id);
        res.status(200).json({ id: req.params.id });
    });

    router.route('/todos/:id').put((req, res, next) => {
        logger.log('info', 'update todos', req.params.id);
        Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(user => {
                res.status(200).json(user);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.route('/todos/:id').delete((req, res, next) => {
        logger.log('info', 'Delete todo ' + req.params.id);
        Todo.remove({ _id: req.params.id })
            .then(user => {
                res.status(200).json({ msg: "Todo Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    });    

    router.route('/todos/login').post((req, res, next) => {
        logger.log('info', '%s logging in', req.body.email);
        var email = req.body.email
        var password = req.body.password;
        var obj = { 'email': email, 'password': password };
        res.status(201).json(obj);
    });

    router.route('/todos/user/:id').get((req, res, next) => {
        logger.log('info', 'Get all a users todos');
        var query = Todo.find({userID: req.params.id})
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No todos" });
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    
    

};