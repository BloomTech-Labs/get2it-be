const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const Tasks = require('../tasks/tasks-model');

// for endpoints beginning with /api/users