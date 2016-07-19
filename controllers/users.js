// Require resource's model(s).
var User = require("../models/user"),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.superSecret;


//||||||||||||||||||||||||||--
// CREATE USER
//||||||||||||||||||||||||||--
var userCreate = function(req, res) {
  var user          = new User();   // create a new instance of the User model
  user.name         = req.body.name;  // set the users name (comes from the request)
  user.phoneNumber  = req.body.phoneNumber;  // set the users phone number (comes from the request)
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
  show:  show
};
