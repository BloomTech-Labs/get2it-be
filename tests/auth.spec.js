process.env.NODE_ENV = "testing";
const db = require("../db/index");
const request = require("supertest");
const app = require("../server");
// for decoding the token and easily extracting the id from the payload
const jsonwebtoken = require("jsonwebtoken");
// for hashing the password successfully when we create users
const bcrypt = require("bcryptjs");

// our global object for storing auth information
let auth = {};


// before each request, create a user and log them in
beforeEach(async () => {
	let user = request.body;
	const hash = bcrypt.hashSync(user.password, 10); 
	user.password = hash;

  const response = await request(app)
    .post("/register")
    .send({
      username: "test",
      password: "secret"
    });
  // take the result of the POST /users/auth which is a JWT
  // store it in the auth object
  auth.token = response.body.token;
  // store the id from the token in the auth object
  auth.current_user_id = jsonwebtoken.decode(auth.token).user_id;
});

// remove all the users
afterEach(async () => {
  await db('users').truncate();
});


describe("GET /edit-profile/:id", () => {
  test("routes authorized user to edit profile page", async () => {
    const response = await request(app)
      .get(`/edit-profile/${auth.current_user_id}`)
      // add an authorization header with the token
      .set("authorization", auth.token);
    expect(response.body.length).toBe(1);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /edit-profile/:id", () => {
  test("unauthorized user cannot view edit profile page", async () => {
    // don't add an authorization header with the token...see what happens!
    const response = await request(app).get(`/edit-profile/${auth.current_user_id}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});

describe("GET /edit-profile/:id", () => {
  test("authorizes only user with valid id", async () => {
    const response = await request(app)
      // add an authorization header with the token, but go to a different ID than the one stored in the token
      .get(`/edit-profile/${auth.current_user_id}`)
      .set("authorization", auth.token);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});

describe("GET /edit-profile/:id", () => {
  test("authorizes only user with valid token", async () => {
    const response = await request(app)
      // add an authorization header with the token, and go to the same ID as the one stored in the token
      .get(`/edit-profile/${auth.current_user_id}`)
      .set("authorization", auth.token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("You made it!");
  });
});