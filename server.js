require('babel-register');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var env = require('node-env-file');
var jwt = require('jsonwebtoken');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');
var path = require('path');

// API Routes
var applicationRouter = require('./routes/applications.js');
var authRouter = require('./routes/authentication.js');

var app = express();

// configure environment
env(__dirname + '/.env');

// configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get static assets
app.use(express.static(path.join(__dirname, 'public')));

// configure react routing
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Sorry, the page you were looking for could not be found!')
    }
  });
});

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

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
