// server.js

// dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');

// modules
var applicationRouter = require('./routes/applications.js');
var authRouter = require('./routes/authentication.js');
var db = require('./config/db.js');
var secret = require('./config/secret.js');

var app = express();

// configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to remote DB
// var dbUrl = (process.env.NODE_ENV === 'production' ? db.prodUrl : db.devUrl);
var dbUrl = db.prodUrl;
var mongo = mongoose.connect(dbUrl).connection;

mongo.on('error', function(err) {
  console.log(err);
});

mongo.once('open', function() {
  console.log('DB connected!');
});

// apply application routes to app
// endpoints are /application/<id>
app.use('/auth', authRouter);
app.use('/applications', applicationRouter);
app.use('/applications', expressJwt({ secret: secret.tokenSecret }));

app.set('port', 3000);

app.get('/', function(req, res) {
  res.send('The Wildhacks API lives here!');
});

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
