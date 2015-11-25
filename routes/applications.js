// routes/applications.js

var express = require('express');
var applicationRouter = express.Router();
var Application = require('../models/Application.js');

applicationRouter.get('/', function(req, res) {
  // return all applications
  Application.find(function(err, applications) {
    if (err) {
      res.send(err);
    } else {
      res.json(applications);
    }
  });
});

applicationRouter.get('/:id/', function(req, res) {
  // return application with given id
  var id = req.params.id;

  Application.findById(id, function(err, application) {
    if (err) {
      res.send(err);
    } else {
      res.json(application);
    }
  });
});

applicationRouter.get('/:key/:value', function(req, res) {
  var key = req.params.key;
  var value = req.params.value;
  var criteria = {};
  criteria[key] = value

  Application.find(criteria, function(err, applications) {
    if (err) {
      res.send(err);
    } else {
      res.json(applications);
    }
  });
});

applicationRouter.post('/', function(req, res) {
  // create application
  // create new instance of Application from req.body
  var application = new Application(req.body);
  application.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      // return positive status
      res.json({ status: true });
    }
  });
});

applicationRouter.put('/<id>', function(req, res) {
  // update application with given id
});

applicationRouter.delete('/<id>', function(req, res) {
  // delete application with given id
})

// expose applicationRouter as a module
module.exports = applicationRouter;
