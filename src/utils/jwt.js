const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret'; // Replace with an environment variable in production

// Generate JWT token
exports.generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

// Verify JWT token
exports.verifyToken = (token) => {
  return jwt.verify(token, secret);
};
