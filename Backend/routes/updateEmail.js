const express = require('express');
const router = express.Router();
const {handleGetEmail,handleUpdateEmail}= require("../controllers/email")

router.get("/:id",handleGetEmail)
router.put("/:id",handleUpdateEmail)

module.exports=router;