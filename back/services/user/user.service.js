const Model = require('../../models/user.model');
const User = require('./user.class');
const hooks = require('./user.hooks');

module.exports = function(app) {
  const options = {
    paginate: app.get('paginate'),
    Model,
  };
  app.use('user', new User(options, app));

  const service = app.service('user');
  service.auth = {
    find: ['user'],
    get: ['user'],
    create: ['*'],
    update: ['user'],
    patch: ['user'],
    remove: ['admin'],
  };

  service.hooks(hooks);
};
