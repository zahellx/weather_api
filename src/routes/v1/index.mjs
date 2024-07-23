import express from 'express';
import weather from './weather.mjs'
import docs from './docs.mjs'

const router = express.Router();

router.use('/weather', weather);
router.use('/docs', docs);

export default router;