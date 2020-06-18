const db = require('../database/dbConfig');
const request = require("supertest");
const server = require("../server");

describe('Auth Routes', () => {
  describe('Register user', () => {
    it('Should return 201',async (done) => {
      await db('users').truncate()

      request(server)
        .post("/api/auth/register")
        .send({
          displayName: 'Bob1',
          email: "bob1@gmail.com",
          password: "1234test"
        })
        .expect(201, done)
    })
  })  
})

