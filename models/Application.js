// models/Application.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this is all you Jaiveer
var ApplicationSchema = new Schema({

});

// expose Application schema to the entire application
module.exports = mongoose.model('Application', ApplicationSchema);
