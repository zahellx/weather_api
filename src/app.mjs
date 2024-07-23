import express from 'express';
import config from 'config';
import Database from './database/index.mjs';
import routes from './routes/v1/index.mjs';
import logger from './utils/logger.mjs';
import errorHandler from './middlewares/errorHandler.mjs';

const app = express();
const database = new Database(config.get('mongo'));
logger.info('Starting server...');
app.use(express.json());

await database.init();

const injectDatabase = (req, res, next) => {
  req.database = database;
  next();
};
app.use(injectDatabase);

app.use('/api/v1', routes);
app.use(errorHandler)

export default app;