import catchAsync from '../utils/catchAsync.mjs';
import weatherService from '../services/weather.mjs';
import query2Mongo from '../utils/query2mongo.mjs';

const findWeathers = catchAsync(async (req, res) => {
  const { filter, options } = query2Mongo(req.query.where);
  const { database } = req;
  options.projection = { _id: 0, expireAt: 0 };
  if (filter.exclude) options.projection = { ...options.projection, ...filter.exclude.reduce((acc, key) => ({ ...acc, [key]: 0 }), {}) };
  delete filter.exclude;
  const result = await weatherService.findWeathers({ collection: database.weather, filter, options });
  res.send(result);
});

const findWeathersDaily = catchAsync(async (req, res) => {
  const { filter, options } = query2Mongo(req.query.where);
  const { database } = req;
  options.projection = { daily: 1, hourly: 1, _id: 0 };
  const result = await weatherService.findWeathers({ collection: database.weather, filter, options });
  res.send(result);
});

const findWeathersHourly = catchAsync(async (req, res) => {
  const { filter, options } = query2Mongo(req.query.where);
  const { database } = req;
  options.projection = { hourly: 1, _id: 0 };
  const result = await weatherService.findWeathersHourly({ collection: database.weather, filter, options });
  res.send(result);
});

export default {
  findWeathers,
  findWeathersDaily,
  findWeathersHourly,
};
