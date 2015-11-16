// server.js

// dependencies
var express = require('express');

// modules
var applicationRouter = require('./routes/applications.js');

var app = express();

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
