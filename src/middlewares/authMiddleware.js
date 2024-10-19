const jwt = require('../utils/jwt');

// Middleware to authenticate JWT tokens
exports.authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send({ message: 'Invalid token' });
  }
};
