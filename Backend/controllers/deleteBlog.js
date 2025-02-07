const Blog = require('../models/Blog');
const User = require("../models/User")

async function handleDeleteBlog(req, res) {
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
}

module.exports = {handleDeleteBlog}