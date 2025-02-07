const express = require('express');
const router = express.Router();
const { handleGetStatus, handleUpdateStatus } = require("../controllers/status")
router.post("/", handleUpdateStatus)
router.get("/:userId", handleGetStatus)
module.exports = router;