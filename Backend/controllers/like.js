const Blog = require('../models/Blog');

async function handleLikeBlog (req, res) {
    const { postId } = req.params;
    const { userId } = req.body;

    try {
        const blog = await Blog.findById(postId);

        if (!blog) return res.status(404).send({ message: "Blog not found" });

        // Toggle like/unlike
        const isLiked = blog.likes.includes(userId);

        if (isLiked) {
            blog.likes = blog.likes.filter(id => id.toString() !== userId);
        } else {
            blog.likes.push(userId);
        }

        await blog.save();
        console.log("donee");
        

        res.send({ likes: blog.likes.length, isLiked: !isLiked });
    } catch (err) {
        res.status(500).send({ message: "Failed to like/unlike the post", error: err.message });
    }
}
module.exports = {handleLikeBlog}