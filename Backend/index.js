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
        res.send({ result: "Enter Complete information" });
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

app.get("/update/:id", async (req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    res.send(user)
}
)
app.put("/update/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})

// Home Route with Image Upload
app.post("/home", upload.single("image"), async (req, res) => {
    try {
        const { title, description, content, author } = req.body;
        // const image = req.file ? req.file.path : null; // Save image path
        const image = req.file ? path.join('uploads', req.file.filename).replace(/\\/g, '/') : null;

        const blog = new Blog({ title, description, content, image, author });
        const savedBlog = await blog.save();

        res.send(savedBlog);
    } catch (err) {
        console.error(err);
        res.send({ error: "Failed to save blog" });
    }
});

app.get("/home", async (req, res) => {
    let blogs = await Blog.find()
    if (blogs.length > 0) {
        res.send(blogs)
    }
    else {
        res.send("no result");
    }
})
// app.get("/profile/:id", async (req, res) => {
//     let result = await Blog.find({ author : req.params.id })
//     if (result) {
//             res.send(result)
//     }
//     else {
//             res.send({ result: "No record" })
//     }
// })
app.get('/profile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('sharedPosts'); // Populate shared posts
        if (!user) return res.status(404).json({ error: "User not found" });

        const myBlogs = await Blog.find({ author: id }); // Fetch user's own blogs
        res.status(200).json({ myBlogs, sharedPosts: user.sharedPosts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/profile/:userId/share', async (req, res) => {
    try {
        const { userId } = req.params;
        const { postId } = req.body;

        // Find the user and update shared posts
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (!user.sharedPosts.includes(postId)) {
            user.sharedPosts.push(postId);
            await user.save();
        }

        res.status(200).json({ message: "Post shared successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { userId } = req.body; // Assuming `userId` is sent in the request body
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Check if the blog exists in the `blogs` collection
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the blog is owned by the user
        if (blog.author.toString() === userId) {
            // User owns the blog; delete it from the `blogs` collection
            await Blog.deleteOne({ _id: req.params.id });
            return res.json({ message: 'Blog deleted successfully' });
        }

        // If not owned, check if it's shared with the user
        const user = await User.findById(userId);
        if (user && user.sharedPosts.includes(req.params.id)) {
            // Remove the blog ID from the user's `sharedPosts` array
            user.sharedPosts = user.sharedPosts.filter(
                (postId) => postId.toString() !== req.params.id
            );
            await user.save();
            return res.json({ message: 'Shared blog removed successfully' });
        }

        // If neither owned nor shared, return unauthorized
        return res.status(403).json({ error: 'Unauthorized to delete this blog' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the blog' });
    }
});
// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
