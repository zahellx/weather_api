// Import the necessary modules
import request from 'supertest';
import app from '../src/app.mjs';
import {expect, jest, it, describe} from '@jest/globals';
import weatherPlugin from '../src/plugins/openWeatherMap.mjs';

// Describe block for grouping tests
describe('Response Tests', () => {
    // Test for a successful API call
    it('should return 200 and the correct body for a correct API call', async () => {
        const response = await request(app).get('/api/v1/weather?where[lat]=10&where[lon]=10');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('lat');
    });

    it('should return 200 and the correct body for a correct API call with data from cache ', async () => {
        //Avoid call to external service
        const spy = jest.spyOn(weatherPlugin, 'getWeather');
        const response = await request(app).get('/api/v1/weather?where[lat]=10&where[lon]=10');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('lat');
        expect(spy).toHaveBeenCalledTimes(0);
        spy.mockRestore();
    });

    it('should return 200 and the correct body for a correct API call with exclude filter', async () => {
        const response = await request(app).get('/api/v1/weather?where[lat]=10&where[lon]=10&where[exclude][0]=hourly');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('lat');
        expect(response.body).not.toHaveProperty('hourly');
    });

    it('should return 200 and the correct body for a correct API call with hour filter', async () => {
        const hour = 10
        const response = await request(app).get(`/api/v1/weather?where[lat]=15&where[lon]=15&where[hour]=${hour}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('hourly');
        expect(Object.keys(response.body.hourly).length).toBe(2);
        expect(response.body.hourly[0]).toHaveProperty('dt');
        expect(new Date(response.body.hourly[0].dt * 1000).getHours()).toBe(hour);
    });

    // Test the hourly weather endpoint
    it('should return 200 for the hourly weather endpoint', async () => {
        const hour = 12
        const response = await request(app).get(`/api/v1/weather/hourly?where[lat]=80&where[lon]=90&where[hour]=${hour}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('hourly');
        expect(response.body).not.toHaveProperty('daily');
        expect(Object.keys(response.body.hourly).length).toBe(2);
        expect(response.body.hourly[0]).toHaveProperty('dt');
        expect(new Date(response.body.hourly[0].dt * 1000).getHours()).toBe(hour);
    });

    // Test the daily weather endpoint with additional parameters
    it('should return 200 for the daily weather endpoint with parameters', async () => {
        const response = await request(app).get(`/api/v1/weather/daily?where[lat]=30&where[lon]=90`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('hourly');
        expect(response.body).toHaveProperty('daily');
        expect(Object.keys(response.body.hourly).length).toBe(48);
    });

    // Test for a 404 response by calling a nonexistent endpoint
    it('should return 404 for an incorrect API call', async () => {
        const response = await request(app).get('/api/v1/nonexistentEndpoint');
        expect(response.statusCode).toBe(404);
    });

});