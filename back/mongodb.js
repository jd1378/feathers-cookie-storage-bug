const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const isTestEnviron = process.env.NODE_ENV === 'test';

module.exports = async function(app) {
  const mongod = new MongoMemoryServer();
  const uri = await mongod.getConnectionString();
  const logger = app.logger;
  logger.info('mongo connection string:');
  logger.info(uri);
  if (isTestEnviron) return;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      logger.error(err);
    });
};
