// process.env.NODE_ENV = "testing";
const db = require("../db/index");
const bcrypt = require('bcryptjs');
const jsonwebtoken = require("jsonwebtoken");

// import { loginWithDefaultUser, cleanExceptDefaultUser } from './testHelper.spec';

// use supertest to test HTTP requests/responses
const request = require('supertest');
// we also need our app for the correct routes!
const server = require('../server');

let auth = {};

//before the tests run, create the users table
beforeAll(async () => {
	await db.query("CREATE TABLE users(id SERIAL PRIMARY KEY, username TEXT, password, TEXT)")
});

beforeEach(async () => {
	const hashedPassword = await bcrypt.hash("secret", 1);
	await db.query("INSERT INTO users (username, password) VALUES ('test', $1)",[
		hashedPassword
	]);
	const response = await request(server)
		.post("/auth/register")
		.send({
			username: "test",
			password: "secret"
		});
	auth.token = response.body.token;
	auth.current_user_id = jsonwebtoken.decode(auth.token).user_id;
});

// delete all users from users table
afterEach(async () => {
	await db.query("DELETE from users");
});

// drop the users table and close the db connection
afterAll(async () => {
	await db.query("DROP TABLE users");
	db.end();
});


describe('Auth API', () => {
	describe("GET /users/:id", () => {
		it ('should return a 200 status for authorized user',  async () => {
			const response = await request(server)
			.get(`/api/users/${auth.current_user_id}`)
			// add an authorization header w/the token
			.set("authorization", auth.token);
			expect(response.body.length).toBe(1);
			expect(response.statusCode).toBe(200);
			expect(response.body.message).toBe(`Welcome ${user.username}!`);
		})
	}, 40000)
})