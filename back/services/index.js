const user = require('./user/user.service');

module.exports = function(app) {
  app.configure(user);
};
