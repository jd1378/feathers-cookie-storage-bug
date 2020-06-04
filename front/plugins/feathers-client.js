import { CookieStorage } from 'cookie-storage';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
// import rest from '@feathersjs/rest-client';
// import axios from 'axios';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import { iff, discard } from 'feathers-hooks-common';
import Vue from 'vue';
import feathersVuex, { initAuth, hydrateApi } from 'feathers-vuex';

const cookieStorage = new CookieStorage({
  path: '/',
  sameSite: 'Lax',
});

const socket = io(process.env.backendUrl, {
  path: '/ws',
  transports: ['websocket'],
  upgrade: false,
});

// const restClient = rest('/api');

const feathersClient = feathers()
  .configure(socketio(socket))
  // .configure(restClient.axios(axios))
  .configure(auth({ storage: cookieStorage }))
  .hooks({
    before: {
      all: [
        iff(
          (context) => ['create', 'update', 'patch'].includes(context.method),
          discard('__id', '__isTemp')
        ),
      ],
    },
  });

export default feathersClient;

// Setting up feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  FeathersVuex,
} = feathersVuex(feathersClient, {
  serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
  idField: '_id', // Must match the id field in your database table/collection
  whitelist: ['$regex', '$options'],
  paramsForServer: ['$search'],
  enableEvents: process.client, // No events for SSR server
});

Vue.use(FeathersVuex);

export {
  makeAuthPlugin,
  makeServicePlugin,
  initAuth,
  hydrateApi,
  BaseModel,
  models,
  FeathersVuex,
  cookieStorage,
};
