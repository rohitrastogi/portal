// server.js

// dependencies
var express = require('express');

// modules
var applicationRouter = require('./routes/applications.js');

var app = express();

// apply application routes to app
// endpoints are /application/<id>
app.use('/application', applicationRouter);

app.get('/', function(req, res) {
  res.send('Hello');
});

app.listen(3000, function() {
  console.log('Listening on port ' + 3000);
});
