// routes/applications.js

var express = require('express');
var applicationRouter = express.Router();
var Application = require('../models/Application.js');

// return all applications
applicationRouter.get('/', function(req, res) {
  Application.find(function(err, applications) {
    if (err) {
      res.send(err);
    } else {
      res.json(applications);
    }
  });
});

// get application by id
applicationRouter.get('/:id/', function(req, res) {
  var id = req.params.id;

  Application.findById(id, function(err, application) {
    if (err) {
      res.send(err);
    } else {
      res.json(application);
    }
  });
});

// get applications by any key and value
// eg. /applications/firstName/Nevil
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

// create application
applicationRouter.post('/', function(req, res) {
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