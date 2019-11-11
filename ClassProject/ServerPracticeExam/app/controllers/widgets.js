'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    //User = mongoose.model('User'),
    passportService = require('../../config/passport'),
    passport = require('passport');
    
var Widget = mongoose.model('Widget');

const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 

    router.route('/widgets').get((req, res, next) => {
        logger.log('info', 'Get all widgets');

        var query = Widget.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No widgets" });
                }
            })
            .catch(err => {
                return next(err);
            });

    });

    router.route('/widgets').post((req, res, next) => {
        logger.log('info', 'Create widget');
        var widget = new Widget(req.body);
        widget.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch((err) => {
                return next(err);
            });

    });

    // router.route('/users/login').post((req, res, next) => {
    //     logger.log('info', '%s logging in', req.body.email);
    //     var email = req.body.email
    //     var password = req.body.password;

    //     var obj = { 'email': email, 'password': password };
    //     res.status(201).json(obj);
    // });
    router.route('/widgets/login').post(requireLogin, login),

        router.route('/widgets/:id').get((req, res, next) => {
            logger.log('info', 'Get widget %s' + req.params.id);

            Widget.findById(req.params.id)
                .then(widget => {
                    if (widget) {
                        res.status(200).json(widget);
                    } else {
                        res.status(404).json({ message: "No widget found" });
                    }
                })
                .catch(error => {
                    return next(error);
                });

        });
    router.route('/widgets/:id').put((req, res, next) => {
        logger.log('info', 'Get widget %s' + req.params.id);

        Widget.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(widget => {
                res.status(200).json(widget);
            })
            .catch(error => {
                return next(error);
            });

    });
    router.put('/widgets/password/:id', function (req, res, next) {
        logger.log('info', 'Update widget ' + req.params.id);
        Widget.findById(req.params.id)
            .exec()
            .then(function (widget) {
                if (req.body.password !== undefined) {
                    widget.password = req.body.password;
                }
                widget.save()
                    .then(function (widget) {
                        res.status(200).json(widget);
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    });

    router.route('/widgets/:id').delete((req, res, next) => {
        logger.log('info', 'Get widget %s' + req.params.id);

        Widget.remove({ _id: req.params.id })
            .then(widget => {
                res.status(200).json({ msg: "Widget Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    });

};