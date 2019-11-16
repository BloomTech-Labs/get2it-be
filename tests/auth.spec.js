import { loginWithDefaultUser, cleanExceptDefaultUser } from './testHelper.spec';

const request = require('supertest');

const server = require('./server');

describe('Auth API', () => {
	const apiBase = process.env.API_BASE || '/api';
	const newUser = {"username": "new-user@test.com", "password": "test123"};

	it ('should create user', async () => {
		const expectedStatusCode = 200;
		const response = await request(server).post(apiBase + '/auth/register');

		return cleanExceptDefaultUser().then(() => {
			return response.send(newUser)
				.expect(expectedStatusCode).toBe(200);
		})	
	})
	
	it ('should get the token', () => {
		return cleanExceptDefaultUser().then
	}) 
})