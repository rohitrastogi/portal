// routes/applications.js

var express = require('express');
var applicationRouter = express.Router();
var Application = require('../models/Application.js');

applicationRouter.get('/all', function(req, res) {
  // return all applications
});

applicationRouter.get('/id>', function(req, res) {
  // return application with given id
});

applicationRouter.post('/', function(req, res) {
  // create application
});

applicationRouter.put('/<id>', function(req, res) {
  // update application with given id
});

applicationRouter.delete('/<id>', function(req, res) {
  // delete application with given id
})

// expose applicationRouter as a module
module.exports = applicationRouter;
