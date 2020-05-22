const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const authenticate = require('./auth/restricted-middleware.js');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const categoryRouter = require('./categories/categories-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter);
server.use('/api/categories', authenticate, categoryRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
