const express = require('express');
const router = express.Router();
const { handleLikeBlog } = require("../controllers/like")
const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../key"); 
// const authenticateToken = require("./auth");

router.post("/:postId",authenticateToken, handleLikeBlog)
module.exports = router;


function authenticateToken(req, res, next) {
  // Expecting the token in the format "Bearer <token>"
  console.log("hello bhai");
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header Received:", authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    console.log("no token");
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

// module.exports = {authenticateToken};
