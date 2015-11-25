// server.js

// dependencies
var express = require('express');
var mongoose = require('mongoose');

// modules
var applicationRouter = require('./routes/applications.js');
var secrets = require('./secrets.js');

var app = express();

// connect to remote DB
var db_username = secrets['db']['username'];
var db_password = secrets['db']['password'];
mongoose.connect('mongodb://' + db_username + ':' + db_password + '@ds059694.mongolab.com:59694/wildhacks-api')

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
