const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
	//http calls with supertest return promises, we can use async/await here
	describe('index route', () => {
		it ('should return a 200 status from the index route', async () => {
			const expectedStatusCode = 200;

			const response = await request(server).get('/');

			expect(response.status).toEqual(expectedStatusCode);
		});

		it('should return an html element', async () => {
			const response = await request(server).get('/');

			expect(response.type).toEqual("text/html");
		});

		it('should return a string, "It\'s alive!"', async () => {
			const expectedString = "It's alive!";

			const response = await request(server).get('/');

			expect(response.text).toEqual(expectedString);
		});
	})
})