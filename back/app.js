const path = require('path');
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, './config');

const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const socketio = require('@feathersjs/socketio');
const compress = require('compression');
const cors = require('cors');

const services = require('./services');
const authentication = require('./authentication/authentication.service');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const logger = require('./logger');
const middleware = require('./middleware');

const mongodb = require('./mongodb');

const app = express(feathers());
// custom extentions
app.logger = logger;

// Load app configuration
app.configure(configuration());
app.configure(mongodb);

const allowedOrigins = process.env.APP_ORIGINS.split(',');
app.use(
  cors({
    credentials: true,
    origin: function checkOrigin(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(compress());

// configure for the api
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

app.configure(express.rest());
// record ip for ratelimiting on rest clients
// only can register after rest api above
app.use((req, res, next) => {
  req.feathers.ip = req.ip;
  next();
});
app.configure(
  socketio(
    {
      path: '/ws',
      transports: ['websocket'],
    },
    (io) => {
      io.on('connection', (socket) => {
        // record ip for ratelimiting on websocket clients
        const ip =
          socket.handshake.headers['x-forwarded-for'] ||
          socket.handshake.address;
        socket.feathers.ip = ip;
      });
      app.logger.info('socket server init complete');
    }
  )
);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up event channels (see channels.js)
app.configure(channels);
// Set up our services (see `services/index.js`)
app.configure(services);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
