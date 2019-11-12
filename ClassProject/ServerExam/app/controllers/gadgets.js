'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    //User = mongoose.model('User'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var Gadget = mongoose.model('Gadget');

const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 

    router.route('/gadgets').get((req, res, next) => {
        logger.log('info', 'Get all gadgets');
        var query = Gadget.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                    console.log("Gadgets found!!");
                } else {
                    res.status(404).json({ message: "No gadgets" });
                    console.log("No gadgets found");
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/gadgets/:id').get((req, res, next) => {
        logger.log('info', 'Get gadget %s' + req.params.id);
        Gadget.findById(req.params.id)
            .then(gadget => {
                if (gadget) {
                    res.status(200).json(gadget);
                    console.log('Gadget found!!');
                } else {
                    res.status(404).json({ message: "No gadget found" });
                    console.log("No gadget found");                    
                }
            })
            .catch(error => {
                return next(error);
            });

    });

    router.route('/gadgets').post((req, res, next) => {
        logger.log('info', 'Create gadget');        
        var gadget = new Gadget(req.body);
        gadget.save()
            .then(result => {
                res.status(201).json(result);
                console.log('Gadget Created!!');
            })
            .catch((err) => {
                return next(err);
            });
    });    

    router.route('/gadgets/:id').put((req, res, next) => {
        logger.log('info', 'Get gadget %s' + req.params.id);
        Gadget.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(gadget => {
                res.status(200).json(gadget);
                console.log('Gadget Updated!!');
            })
            .catch(error => {
                return next(error);
            });

    });

    router.route('/gadgets/:id').delete((req, res, next) => {
        logger.log('info', 'Get gadget %s' + req.params.id);
        Gadget.remove({ _id: req.params.id })
            .then(gadget => {
                res.status(200).json({ msg: "Gadget Deleted" });
                console.log('Gadget Deleted!!');
            })
            .catch(error => {
                return next(error);
            });
    });

};