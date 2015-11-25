// server.js

// dependencies
var express = require('express');
var mongoose = require('mongoose');

// modules
var applicationRouter = require('./routes/applications.js');
var db = require('./config/db.js');

var app = express();

// connect to remote DB
// var dbUrl = (process.env === 'production' ? db.prodUrl : db.devUrl);
var dbUrl = db.prodUrl;
var mongoDB = mongoose.connect(dbUrl).connection;

mongoDB.on('error', function(err) {
  console.log(err);
});

mongoDB.once('open', function() {
  console.log('DB connected!');
});

// apply application routes to app
// endpoints are /application/<id>
app.use('/application', applicationRouter);

app.set('port', 3000);

app.get('/', function(req, res) {
  res.send('The Wildhacks API lives here!');
});

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
