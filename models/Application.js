// models/Application.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
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

ApplicationSchema.methods.hashPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

ApplicationSchema.methods.isValidPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// expose Application schema to the entire application
module.exports = mongoose.model('Application', ApplicationSchema);
