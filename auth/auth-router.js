const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved)
      res.status(201).json({
        user: saved,
        // userId: user.id,
        token});
    })
    .catch(({message}) => {
      res.status(500).json(message);
    });
});

router.post('/login', (req, res) => {
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
    .catch(({message}) => {
      res.status(500).json(message);
    });
});

//change username or password
router.put('/edit-profile/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  if (changes.password !== undefined) {
  const hash = bcrypt.hashSync(changes.password, 10); // 2 ^ n
  changes.password = hash};

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
  .catch (err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
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