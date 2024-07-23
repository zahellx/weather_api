/* eslint-disable max-len */
import express from 'express'
import weatherValidation from '../../validations/weather.mjs';
import weatherController from '../../controllers/weather.mjs'
import validate from '../../middlewares/validator.mjs';

const router = express.Router();

router
  .route('/')
  .get(validate(weatherValidation.findWeathers), weatherController.findWeathers);

router
  .route('/daily')
  .get(validate(weatherValidation.findWeathersDaily), weatherController.findWeathersDaily);

router
  .route('/hourly')
  .get(validate(weatherValidation.findWeathersHourly), weatherController.findWeathersHourly);

export default router;

/**
 * @swagger
 * tags:
 *   name: Weather
 *   description: Weather management and retrieval
 */
/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get weather
 *     description: Get weather information
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: where
 *         schema:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lon:
 *               type: number
 *             exclude:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weather'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       429:
 *         description: Too Many Requests
 *       5xx:
 *         description: Server Error
 */

/**
 * @swagger
 * /weather/daily:
 *   get:
 *     summary: Get daily weather
 *     description: Get daily weather information
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: where
 *         schema:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lon:
 *               type: number
 *         description: Filter daily weather information
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherDaily'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       429:
 *         description: Too Many Requests
 *       5xx:
 *         description: Server Error
 */

/**
 * @swagger
 * /weather/hourly:
 *   get:
 *     summary: Get hourly weather
 *     description: Get hourly weather information
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: where
 *         schema:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lon:
 *               type: number
 *             hour:
 *               type: number
 *         description: Filter hourly weather information (UTC)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherHourly'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       429:
 *         description: Too Many Requests
 *       5xx:
 *         description: Server Error
 */