const express = require('express');
const cors = require("cors");
require('./db/config');
const User = require('./db/User');
const Blog = require('./db/Blog');
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Signup Route
app.post("/signup", async (req, res) => {
    if (req.body.password && req.body.email && req.body.name) {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        res.send(result);
    } else {
        res.send({ result: "Enter Complete details" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        } else {
            res.send({ result: "No record" });
        }
    } else {
        res.send({ result: "Enter Complete details" });
    }
});

// Home Route with Image Upload
app.post("/home", upload.single("image"), async (req, res) => {
    try {
        const { title, description, content, author } = req.body;
        const image = req.file ? req.file.path : null; // Save image path

        const blog = new Blog({ title, description, content, image, author });
        const savedBlog = await blog.save();

        res.send(savedBlog);
    } catch (err) {
        console.error(err);
        res.send({ error: "Failed to save blog" });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
