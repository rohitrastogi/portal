// models/Application.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
	firstName						: {type: String, required: true},
	lastName						: {type: String, required: true},
	phoneNumber					: {type: String, required: true},
	email								: {type: String, required: true, unique: true, dropDups: true},
	password 						: {type: String, required: false},
	school      				: {type: String, required: true},
	year								: {type: Number, required: true},
	gender							: {type: String, required: true},
	ethnicity						: {type: String},
	shirtSize						: {type: String, required: true},
	travel							: {type: String, required: true},
	dietaryRestrictions	: {type: String},
	github							: {type: String},
	personalSite				: {type: String},
	resume							: {type: String},
	applicationDate			: {type: Date, required: true},
	githubID               : {type: String, required: false}, 
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
