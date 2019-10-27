var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
//var logger = require('./logger2');
const bodyParser = require('body-parser');

module.exports = function (app, config) {
  app.use(function (req, res, next) {
    logger.log('Request from ' + req.connection.remoteAddress);
    next();
  });

  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }
  
  app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(bodyParser.json());

  app.use(express.static(config.root + '/public'));

  require('../app/controllers/users')(app, config);

  app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  logger.log("Starting application");
};