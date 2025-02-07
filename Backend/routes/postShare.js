const express = require('express');
const router = express.Router();
const { handleSharePost, getAllBlogs } = require("../controllers/postShare")

router.post("/:userId/share", handleSharePost)
router.get("/:id", getAllBlogs)
module.exports = router;