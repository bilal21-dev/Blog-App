const express = require('express');
const router = express.Router();
const { handleDeleteBlog } = require("../controllers/deleteBlog")
router.delete("/:id", handleDeleteBlog)
module.exports = router;