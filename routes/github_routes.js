// server.js
var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require ('passport');

var githubRouter = express.Router();

var Application = require('../models/Application.js');

//route to begin github authentification
githubRouter.get('/auth/github', passport.authenticate('github'));

//route for callback for github authentification 
githubRouter.get('/auth/facebook/callback', 
  passport.authenticate('github', { failureRedirect: '/' }), //not sure what to put here
  function(req, res) {
  	//user is logging in (need to provide token)
    if (req.user.applicationDate) {
    	var token = jwt.sign(application, process.env.JWT_SECRET, { expiresIn: 18000 });
        res.json({ token: token });
    // user is signing in for first time (need to return auth information from github)
    } else if (req.user) {
    	res.send(req.user);
    // if error, user is not authenticated
    } else {
    	res.send(401);
    }
  });

module.exports = githubRouter;