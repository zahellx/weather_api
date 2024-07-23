import config from 'config';
import data from '../../package.json' assert { type: 'json' };


const swaggerDef = {
  openapi: '3.1.0',
  info: {
    title: 'node-express-boilerplate API documentation',
    version: data.version,
  },
  servers: [
    {
      url: `http://localhost:${config.get('server').port}/api/v1`,
    }
  ]
};

export default swaggerDef;