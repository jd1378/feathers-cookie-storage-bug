const { Conflict, BadRequest } = require('@feathersjs/errors');
const bcrypt = require('bcryptjs');

module.exports = () => async (context) => {
  if (context.params.user) {
    if (context.data.currentPassword) {
      const result = await bcrypt.compare(
        context.data.currentPassword,
        context.params.user.password
      );
      if (result) {
        return context;
      } else {
        throw new Conflict('currentPassword does not match');
      }
    }
    throw new BadRequest('currentPassword undefined');
  }
  throw new BadRequest('user undefined');
};
