// Application hooks that run for every service
const { iff, isProvider, disallow } = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const errors = require('@feathersjs/errors');

const errorHandler = (ctx) => {
  if (ctx.error) {
    const error = ctx.error;
    if (!error.code) {
      const newError = new errors.GeneralError('server error');
      ctx.error = newError;
      return ctx;
    }
    if (error.code === 404 || process.env.NODE_ENV === 'production') {
      error.stack = null;
    }
    return ctx;
  }
};

module.exports = {
  before: {
    all: [
      iff(
        isProvider('external'),
        iff(
          (ctx) => ctx.service.auth,
          iff(
            (ctx) => ctx.service.auth[ctx.method],
            iff(
              (ctx) => !ctx.service.auth[ctx.method].includes('*'),
              authenticate('jwt'),
              (ctx) => {
                checkPermissions({
                  roles: ctx.service.auth[ctx.method],
                });
              }
            )
          ).else(disallow())
        ).else(disallow())
      ),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [errorHandler],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
