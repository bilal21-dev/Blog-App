const express = require('express');
const router = express.Router();
const {handleSignup,handleLogin}= require("../controllers/register")

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

module.exports = router;