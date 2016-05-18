// models/Application.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
	firstName: String,
	lastName: String,
	phoneNumber: String,
	email: String,
	password: String,
	school: String,
	year: Number,
	gender: String,
	shirtSize: String,
	travel: String,
	dietaryRestrictions: String,
	github: String,
	personalSite: String,
	resume: String,
	applicationDate: Date
});

ApplicationSchema.methods.hashPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

ApplicationSchema.methods.isValidPassword = function(password) {
	pass = String(password)
	hash = String(this.password)
	return bcrypt.compareSync(pass, hash);
};

// expose Application schema to the entire application
module.exports = mongoose.model('Application', ApplicationSchema);
