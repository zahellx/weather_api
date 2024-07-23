import weatherPlugin from '../plugins/openWeatherMap.mjs';

const getWeather = async ({ collection, filter, options }) => {
    let weather = await collection.findOne({ filter, options });
    if (!weather) {
      weather = await weatherPlugin.getWeather({ lat: filter.lat, lon: filter.lon });
      await collection.create({ weather });
      weather = await collection.findOne({ filter, options });
    }
    return weather;
};

const findWeathersHourly = async ({ collection, filter, options }) => {
    const { hour } = filter;
    delete filter.hour;
    const weather = await getWeather({ collection, filter, options });
    weather.hourly = weather.hourly.filter((data) => {
      const weatherHour = new Date(data.dt * 1000).getHours();
      return weatherHour === hour;
    });
  
    return weather;
};

const findWeathers = async ({ collection, filter, options }) => {
    if (filter.hour) {
      return findWeathersHourly({ collection, filter, options });
    }
    return getWeather({ collection, filter, options });
};


export default {
  findWeathers,
  findWeathersHourly,
};
