import Joi from 'joi';

const latSchema = Joi.number().required().min(-90).max(90).messages({
  'number.base': 'Latitude (lan) is required',
  'number.min': 'Latitude must be at least -90',
  'number.max': 'Latitude must be at most 90',
  'any.required': 'Longitude (lon) is required on where filter (where[lat])'
});
const lonSchema = Joi.number().required().min(-180).max(180).messages({
  'number.base': 'Longitude (lon) is required',
  'number.min': 'Longitude must be at least -180',
  'number.max': 'Longitude must be at most 180',
  'any.required': 'Longitude (lon) is required on where filter (where[lon])'
});

const hourSchema = Joi.number().integer().min(0).max(23).messages({
  'number.min': 'Hour must be at least 0',
  'number.max': 'Hour must be at most 23'
});

const excludeSchema = Joi.array().items(Joi.string().valid('current', 'minutely', 'hourly', 'daily', 'alerts')).messages({ 
  'array.base': 'Exclude must be a list', 
  'array.includes': `Exclude must contain valid values ['current', 'minutely', 'hourly', 'daily', 'alerts']`
});

const findWeathers = {
  query: Joi.object({    
    where: Joi.object({
      lat: latSchema,
      lon: lonSchema,
      hour: hourSchema,
      exclude: excludeSchema
    }).required()
  }).required()
};

const findWeathersDaily = {
  query: Joi.object({    
    where: Joi.object({
      lat: latSchema,
      lon: lonSchema,
    }).required()
  }).required()
};

const findWeathersHourly = {
  query: Joi.object({    
    where: Joi.object({
      lat: latSchema,
      lon: lonSchema,
      hour: hourSchema.required(),
    }).required()
  }).required()
};

export default{
    findWeathers,
    findWeathersDaily,
    findWeathersHourly
};