import config from 'config';
import logger from './utils/logger.mjs';
import app from './app.mjs';
import http from 'http';

(async () => {
  try {
    const PORT = config.get('server.port') || 3000;
    
    http.createServer(app).listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(error);
  }
})();
