import axios from 'axios';
import config from 'config';
import logger from '../utils/logger.mjs';

const openWeatherMapConfig = config.get('weatherService');

async function getWeather({ lat, lon }) {
  const url = `${openWeatherMapConfig.baseUrl}?lat=${lat}&lon=${lon}&appid=${openWeatherMapConfig.apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    logger.error('Error al obtener el clima:', error.response.data);
    const err = new Error(error.response.data.message); 
    err.statusCode = error.response.data.cod;
    err.parameters = error.response.data.parameters
    throw err;
  }
}

export default {
  getWeather,
};
