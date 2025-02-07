const express = require('express');
const router = express.Router();
const multer = require("multer");
const app = express();
const path = require("path");
const { handleImageUpload, HandleGetImage } = require("../controllers/profilePic.js")

// Set up multer storage and file naming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique file name
    },
});
// Initialize multer
const upload = multer({ storage });
// Serve static files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

router.post("/:userId", upload.single('profilePic'), handleImageUpload)
router.get("/:userId", HandleGetImage)

module.exports = router;