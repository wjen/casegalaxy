var mongoose = require('./database');

var User = require('../models/user');

var users = [
  { // 0
    name:   "wen1",
    email: "abc@gmail.com",
    password: "abc123"
  },
  { // 1
    name:   "wen2",
    email: "abcd@gmail.com",
    password: "abcd123"
  }
];

User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length  + " users.");
      mongoose.connection.close(function(err) {
        if (err) console.log(err);
        process.exit(0);
      });
    }
  });
});
