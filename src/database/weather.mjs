class Weather {
  constructor({ collection }, config) {
    this.collection = collection;
    this.config = config;
  }

  async findOne({ filter, options }) {
    return this.collection.findOne(filter, options);
  }

  async create({ weather }) {
    weather.expireAt = new Date(Date.now() + this.config.expirationMilliseconds);
    return this.collection.insertOne(weather);
  }
}

export default Weather;
