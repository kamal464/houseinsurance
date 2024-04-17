// authMiddleware.js
const jwt = require('jsonwebtoken');

const newMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded; // Set the decoded user object in the request
    next();
  });
};

module.exports = { newMiddleware };
