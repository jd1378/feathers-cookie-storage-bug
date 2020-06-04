const { NotAuthenticated } = require('@feathersjs/errors');
const {
  AuthenticationService,
  JWTStrategy,
} = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
// const { expressOauth } = require('@feathersjs/authentication-oauth');

const hooks = require('./authentication.hooks');

class CustomJWTStrategy extends JWTStrategy {
  async authenticate(authentication, params) {
    const { accessToken } = authentication;
    const { entity } = this.configuration;

    if (!accessToken) {
      throw new NotAuthenticated('No access token');
    }

    const payload = await this.authentication.verifyAccessToken(
      accessToken,
      params.jwt
    );

    const result = {
      accessToken,
      authentication: {
        strategy: 'jwt',
        accessToken,
        payload,
      },
    };

    if (entity === null) {
      return result;
    }

    const entityId = await this.getEntityId(result, params);
    const value = await this.getEntity(entityId, params);

    if (payload.iat < Math.floor(value.credUpdatedAt / 1000)) {
      throw new NotAuthenticated('No access token');
    }

    return {
      ...result,
      [entity]: value,
    };
  }
}

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new CustomJWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('authentication', authentication);
  // app.configure(expressOauth());

  const service = app.service('authentication');
  service.auth = {
    // let the service handle it
    find: ['*'],
    get: ['*'],
    create: ['*'],
    update: ['*'],
    patch: ['*'],
    remove: ['*'],
  };

  service.hooks(hooks);
};
