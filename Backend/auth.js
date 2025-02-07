const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../key"); // Make sure this key is defined in your key.js file

function authenticateToken(req, res, next) {
  // Expecting the token in the format "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    // Optionally attach the user payload to the request object
    req.user = user;
    next();
  });
}

module.exports = {authenticateToken};
