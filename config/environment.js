var _ = require('lodash');

var localEnvVars = {
  TITLE:      'casegalaxy',
  SAFE_TITLE: 'case-galaxy',
  superSecret: "mysupersecret"
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
