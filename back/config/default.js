const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  // eslint-disable-next-line
  require('dotenv').config();
}

module.exports = {
  port: process.env.SERVER_PORT || 8080,
  paginate: {
    default: 24,
    max: 36,
  },
  authentication: {
    entity: 'user',
    service: 'user',
    secret: process.env.AUTH_SECRET,
    authStrategies: ['jwt', 'local'],
    jwtOptions: {
      audience: '/',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      usernameField: '\\username',
      passwordField: 'password',
    },
  },
};
