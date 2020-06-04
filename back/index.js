const logger = require('./logger');
const app = require('./app');
const port = app.get('port');

process.on('unhandledRejection', (reason) =>
  logger.error('Unhandled Rejection at: Promise, Reason:' + reason)
);

const server = app.listen(port);

server.on('listening', () =>
  logger.info('Feathers application started on :' + port)
);
