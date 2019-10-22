'use strict'
var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger2');
module.exports = function (app, config) {
app.use('/api', router);
};