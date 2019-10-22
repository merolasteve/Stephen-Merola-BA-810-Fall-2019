'use strict' //forces you to use proper syntax
var express = require('express'), 
  router = express.Router(), //router - object that does all routing
  logger = require('../../config/logger2');

module.exports = function (app, config) {
app.use('/api', router); //appends 'api' to all routes

//routes do here - watch brackets!!!

router.route('/users').get(function (req, res, next) {
    logger.log('info', 'Get all users');
    var users = [{ name: 'John', email: 'woo@hoo.com' },
    { name: 'Betty', email: 'loo@woo.com' },
    { name: 'Hal', email: 'boo@woo.com' }
    ];
    res.status(200).json(users);
});

router.route('/users').get((req, res, next) => { ///apis/users becasue api already appended above
    logger.log('info', 'Get all users'); //every route should have a log - info wont run in prod
    res.status(200).json({message: 'Got all users'}); //200 = a secussful get - temp, must be deleted later
    });

router.route('/users/login').post((req, res, next) => {
    logger.log('info', '%s logging in', req.body.email);
    var email = req.body.email
    var password = req.body.password;
    var obj = {'email' : email, 'password' : password};
    res.status(201).json(obj);
    });

router.route('/users/:id').get((req, res, next) => {
    logger.log('info','Get user %s', req.params.id);
    res.status(200).json({id: req.params.id}); 
    }); 

router.route('/users').post((req, res, next) => {
    logger.log('info','Create user');
    res.status(201).json({message: 'Created user'});   
    });

};