const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator')

const Users = require('../users/users-model.js');

router.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(404).json({ message: 'users not found' });
    })
})

const validationRules = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  check('username').isAlphanumeric(),
]

const validationLogin = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
]

// for endpoints beginning with /api/auth
router.post('/register', validationRules, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved)
      res.status(201).json({
        user: saved,
        // userId: user.id,
        token
      });
    })
    .catch(({ message }) => {
      if (validationResult(req).array().length !== 0) {
        res.status(500).json(message);
      }
    });
});

router.post('/login', validationLogin, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        console.log(user)
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          user: user,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(({ message }) => {
      res.status(500).json(message);
    });
});

//change username or password
router.put('/edit-profile/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  if (changes.password !== undefined) {
    const hash = bcrypt.hashSync(changes.password, 10); // 2 ^ n
    changes.password = hash
  };

  Users.findById(id)
    .then(user => {
      if (user) {
        Users.update(changes, id)
          .then(updatedTask => {
            res.json(updatedTask);
          });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update user' });
    });
})

//deletes a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params
  usersData.deleteUser(id)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(({ name, message, code, stack }) => {
      res.status(500).json({ name, message, code, stack })
    })
})

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}


module.exports = router;