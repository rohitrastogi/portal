// models/Application.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	school: String,
	year: Number,
	shirtSize: String,
	reimbursement: Boolean,
	github: String,
	linkedin: String,
	personalSite: String,
	resume: String,
	response1: String,
	response2: String,
	applicationDate: Date
});

// expose Application schema to the entire application
module.exports = mongoose.model('Application', ApplicationSchema);
