const express = require('express');
const router = express.Router();
const { handlePasswordChange } = require("../controllers/password")

router.put("/:id", handlePasswordChange)
module.exports = router;