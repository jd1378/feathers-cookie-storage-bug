const { setField } = require('feathers-authentication-hooks');
const {
  preventChanges,
  isProvider,
  iff,
  required,
  validate,
  disallow,
} = require('feathers-hooks-common');
const { BadRequest } = require('@feathersjs/errors');
const checkPermissions = require('feathers-permissions');
const {
  hashPassword,
  protect,
} = require('@feathersjs/authentication-local').hooks;

const updateCredentialsStamp = require('../../hooks/update-credentials-stamp');
const checkCurrentPassword = require('../../hooks/check-current-password');

const noModificationList = preventChanges(
  true,
  'username',
  'permissions',
  'createdAt',
  'credUpdatedAt'
);

function createUserValidator(values) {
  const formErrors = {};

  if (values.password.length > 50) {
    formErrors['password'] = 'password should be shorter than 50 characters';
  }

  if (Object.keys(formErrors).length > 0) {
    throw new BadRequest({ errors: formErrors });
  }

  return null;
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [
      iff(
        isProvider('external'),
        checkPermissions({
          roles: ['admin'],
          error: false,
        }),
        iff(
          (context) => !context.params.permitted,
          setField({
            from: 'params.user._id',
            as: 'params.query._id',
          })
        )
      ),
    ],
    update: [disallow()],
    create: [
      required('username', 'password'),
      validate(createUserValidator),
      hashPassword('password'),
    ],
    patch: [
      iff(
        isProvider('external'),
        checkPermissions({
          roles: ['admin'],
          error: false,
        }),
        iff(
          (context) => !context.params.permitted,
          setField({
            from: 'params.user._id',
            as: 'params.query._id',
          })
        ),
        noModificationList,
        iff((ctx) => ctx.data.password, checkCurrentPassword())
      ),
      hashPassword('password'),
    ],
    remove: [],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [iff((ctx) => ctx.data.password, updateCredentialsStamp())],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
