const Blog = require('../models/Blog');
const User = require("../models/User")

async function getAllBlogs(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('sharedPosts'); // Populate shared posts
        if (!user) return res.status(404).json({ error: "User not found" });

        const myBlogs = await Blog.find({ author: id }); // Fetch user's own blogs
        res.status(200).json({ myBlogs, sharedPosts: user.sharedPosts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
async function handleSharePost(req, res) {
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
}

module.exports = {
    handleSharePost, getAllBlogs
}
