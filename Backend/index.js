const express = require('express');
const cors = require("cors");
require('./models/config');
const User = require('./models/User');
const Blog = require('./models/Blog');
const multer = require("multer");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

const regRoute = require("./routes/register")
const emailRoute = require("./routes/updateEmail")
const blogRoute = require("./routes/blogs")
const deleteRoute = require("./routes/deleteBlog")
const likeRoute = require("./routes/like")
const statusRoute = require("./routes/status")
const profileRoute = require("./routes/profilePic")
const passwordRoute = require("./routes/password")
const postShareRoute = require("./routes/postShare")



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




app.use("/auth", regRoute)
app.use("/update", emailRoute)
app.use("/home", blogRoute)
app.use("/delete", deleteRoute)
app.use("/like", likeRoute);
app.use("/status", statusRoute)
app.use("/profile-pic", profileRoute)
app.use("/password", passwordRoute)
app.use("/profile", postShareRoute)


//routes to update blog
app.get('/home/blogdata/:id', async (req, res) => {
    try {
        // Get the blog ID from request parameters
        const blogId = req.params.id;

        // Find the blog in the database by ID
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Return the blog data in the response
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/home/blogdata/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    
    // Fields sent in the form will be in req.body
    const { title, description, content, author } = req.body;
  
    // If an image was uploaded, it will be in req.file
    let image;
    if (req.file) {
      // req.file.path gives you the relative path to the uploaded file
      image = req.file.path;
    }
    
    // Build the update object. Only update the image if a new file is uploaded.
    const updateData = {
      title,
      description,
      content,
      author,
      ...(image && { image })  // Only include the image field if image exists
    };
  
    Blog.findByIdAndUpdate(id, updateData, { new: true })
      .then(updatedBlog => res.json(updatedBlog))
      .catch(err => res.status(500).json({ error: 'Error updating blog' }));
  });
  





// Start server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
