//passport.js
var GithubStrategy = require ('passport-github').Strategy;
var Application = require('./models/Application');

module.exports = function(passport) {

	//serializes the user
	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //deserializes the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

	passport.use(new GithubStrategy ({
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET, 
		callbackURL: process.env.DEV_PORT + "auth/github/callback"
	},

	function(token, refreshToken, profile, done) {
		process.nextTick(function () {
			
			var login = {
				email : profile.emails[0].value,
				first_name : profile.name.givenName,
				last_name : profile.name.familyName,
				username : profile.username,
				id : profile.id
			};

			// find user in database based on their github id
			User.findOne({ githubID : profile.id}, function (err, user) {
				// if there is an error, return the error
				if (err) {
					return done(err);
				// if there is a user, we must return the user 
				} else if (user) {
					return done(null, user);
				// if there is no user found with that github id, return object with desired information
				} else {
					return done (null, login);
				}
			});
		});
	}));
}; 