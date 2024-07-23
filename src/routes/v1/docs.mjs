import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../../docs/swaggerDef.mjs';

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.mjs'],
});

const swaggerOptions = {
  explorer: true,
  tryItOutEnabled: false,
};

router.use('/', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));
router.get(
  '/',
  swaggerUi.setup(specs, swaggerOptions),
);

export default router;