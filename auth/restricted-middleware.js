const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'not verified' })
      } else {
        req.decodedToken = decodedToken
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'no token provided' })
  }
};