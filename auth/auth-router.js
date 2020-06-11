const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator')
const Users = require('../users/users-model.js');
const Categories = require('../categories/categories-model');

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
  check('displayName').isAlphanumeric(),
]

const validationLogin = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 })
]


// for endpoints beginning with /api/auth
router.post('/register', validationRules, (req, res) => {
  let newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 10); // 2 ^ n
  newUser.password = hash;

  Users.add(newUser)
    .then(saved => {
      const token = generateToken(saved);
      const id = saved.id
      res.status(201).json({
        user: saved,
        token
      });  
      console.log("Created User Succesfully");
      return(id) 
    })
    .then(id => {
      console.log(id)  

      Categories.add({name: 'Personal', user_id: id})
        .then(res => {
          console.log(res)
        })  
        .catch(err => {
          console.log(err)
        });
    })
    .catch(({ message }) => {
      console.log("Catch error from Line 46 of register in auth-router.js:", message)
      if (validationResult(req).array().length !== 0) {
        res.status(500).json(message);
      }
    });
});

router.post('/login', validationLogin, (req, res) => {
  let { email, password } = req.body;

  Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        console.log(user)
        res.status(200).json({
          message: `Welcome ${user.displayName}!`,
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
router.put('/users/:id', (req, res) => {
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
    displayName: user.displayName,
    email: user.email
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}
module.exports = router;
