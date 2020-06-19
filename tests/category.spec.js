process.env.NODE_ENV = 'testing';
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

describe("server", function () {
  describe("GET functions", function () {
    it("should return a status of 200", async function () {
      const response = await request(server).get("1/categories");
      expect(response.status).toBe(200);
    });
    it("should return a status of 404", async function () {
      const response = await request(server).get("/");
      expect(response.status).toBe(404);
    });
  });

  describe("GET/:id route functions", function () {
    it("should return a status of 200", async function () {
      const response = await request(server).get("/categories/1");
      expect(response.status).toBe(200);
    });

    it("should return an the specified category", async function () {
      const response = await request(server).get("/categories/1");
      expect(response.body).toEqual({

          id: 1,
          name: "category-01",

      });
    });
  });

  describe("POST route function", function () {
    it("should return a status of 200", async function () {
      const response = await request(server).post("/categories").send({
        id: 19,
        name: "category-l",
      });

      expect(response.status).toBe(201);
    });

    it("should return an array with extra categories", async function () {
      const response = await request(server).post("/categories").send({
        id: 16,
        name: "category-z",
      });
      expect(typeof response.body).toBe("object");
    });
  });

  describe("DELETE route function", function () {
    it("should return a status of 200 and be the object", async function () {
      const response = await request(server).delete("/categories/13");

      expect(response.status).toBe(200);
    });
    it("should return an object", async function () {
      const response = await request(server).delete("/categories/13");

      expect(typeof response.body).toBe("object");
    });
  });
});
