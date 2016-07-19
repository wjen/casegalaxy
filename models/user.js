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
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

// hash the password before the user is saved
userSchema.pre('save', function(next) {
  var user = this;

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

// method to compare a given password with the database hash
userSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
