// routes/authentication.js

var express = require('express');
var jwt = require('jsonwebtoken');
var multer = require('multer');

var authRouter = express.Router();
var upload = multer({ dest: 'resumes/' });

var Application = require('../models/Application.js');

// signup route
// should be used when first create an application
authRouter.post('/signup', upload.single('resume'), function(req, res) {
  // rename downloaded file
  if (req.file) {
    var filename = req.file.filename;
    var newFilename = req.body.firstName + '_' + req.body.lastName + '_Resume.pdf';
    fs.renameSync('./resumes/' + filename, './resumes/' + newFilename);
    req.body['resume'] = newFilename;
  }

  // create new instance of Application from req.body
  var application = new Application(req.body);
  
  // hash password before saving
  application.password = application.hashPassword(application.password);

  // fill in application date
  application.applicationDate = new Date();

  application.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      // return token
      var token = jwt.sign(application, process.env.JWT_SECRET, { expiresIn: 18000 });
      res.json({ token: token });
    }
  });
})

authRouter.post('/login', function(req, res) {
  var email = req.body.email;
  var pass = req.body.password;

  Application.findOne({ email: email }, function(err, application) {
    if (err) {
      res.send(err);
    } else {
      if (!application.isValidPassword(pass)) {
        res.send(401, 'Not authorized!');
      }

      if (req.body.email === process.env.ADMIN_EMAIL) {
        // admin access
        // render admin panel
      } else {
        var token = jwt.sign(application, process.env.JWT_SECRET, { expiresIn: 18000 });
        res.json({ token: token });
        // res.render(react sdfajd)
      }
    }
  });

});

module.exports = authRouter;
