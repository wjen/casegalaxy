var mongoose = require('mongoose'),
    debug    = require('debug')('app:models'),
    Schema       = mongoose.Schema,
    bcrypt       = require('bcrypt-nodejs');

//create user schema
var userSchema = new Schema({
  name:     { type: String, required: true },
  email:    {
             type: String,
             lowercase: true,
             required: true,
             index: { unique: true},
             validate: /[\w+\-.]+@[a-z\.]+\.[a-z]+/i
  },
  password: {
             type: String,
             required: true,
             select: false,
             minlength: 4
  }
});

// exclude password
UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
  var user = this;

var User = mongoose.model('User', userSchema);

module.exports = User;
