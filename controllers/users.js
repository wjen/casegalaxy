// Require resource's model(s).
var User        = require("../models/user"),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.superSecret;

//||||||||||||||||||||||||||--
// AUTHENTICATE USER
//||||||||||||||||||||||||||--
var userAuth = function (req, res, next) {
  // find the user
  User.findOne({
      phoneNumber: req.body.phoneNumber
    }).select('phoneNumber password name').exec(function(err, user) {

      if (err) throw err;

      // no user with that phone number was found
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {

        // check if password matches
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign({
            phoneNumber: user.phoneNumber,
            name:        user.name,
            _id:         user._id
          }, superSecret, {
            expiresInMinutes: 43200 // expires in 30 days
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: user
          });
        }

      }

    });
  };

//||||||||||||||||||||||||||--
// VERIFIY TOKEN
//||||||||||||||||||||||||||--
var tokenVerify = function(req, res, next) {
  // do logging
  console.log('Somebody just accessed the Fishin Triumphs API!');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
      });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;

        next(); // make sure we go to the next routes and don't stop here
      }
    });

  } else {

    // if there is no token
    // return an HTTP response of 403 (access forbidden) and an error message
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};
//||||||||||||||||||||||||||--
// CREATE USER
//||||||||||||||||||||||||||--
var userCreate = function(req, res) {
  var user          = new User();   // create a new instance of the User model
  user.name         = req.body.name;  // set the users name (comes from the request)
  user.email        = req.body.email;  // set the users phone number (comes from the request)
  user.password     = req.body.password;  // set the users password (comes from the request)

  user.save(function(err) {
    if (err) {
      // duplicate entry
      if (err.code == 11000)
        return res.json({ success: false, message: 'A user with that info already exists! '});
      else
        return res.json(err);
    }

    // return a message
    res.json({ message: "Welcome message for you!" });
  });

};



var index = function(req, res, next){
  User.find({}, function(err, users) {
    if (err) {
      res.json({message: err});
    } else {
      res.render('users/index', {users: users});
    }
  });
};

var show = function(req, res, next){
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.render('users/show', {user: user});
    }
  });
};

module.exports = {
  index: index,
  show:  show,
  userCreate: userCreate
};
