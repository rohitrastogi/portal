// server.js

// dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var env = require('node-env-file');
var jwt = require('jsonwebtoken');

// modules
var applicationRouter = require('./routes/applications.js');
var authRouter = require('./routes/authentication.js');

var app = express();

// configure environment
env(__dirname + '/.env');

// configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// /applications endpoints require authentication
// add Authorization: Bearer <token> to request header
app.use('/applications', expressJwt({ secret: process.env.JWT_SECRET }));
// use a middleware function to ensure that only admin can access /applications endpoints
app.use('/applications', function(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  var user = jwt.decode(token);
  if (user.email === process.env.ADMIN_EMAIL) {
    next();
  } else {
    // unauthorized
    return res.sendStatus(403)
  }
});

// connect to remote DB
var dbUrl = (
  process.env.NODE_ENV === 'production' ? process.env.DB_PROD_URL : process.env.DB_DEV_URL
);
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

app.set('port', (process.env.NODE_ENV === 'production' ? process.env.PROD_PORT: process.env.DEV_PORT));

app.get('/', function(req, res) {
  res.send('The Wildhacks API lives here!');
});

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
