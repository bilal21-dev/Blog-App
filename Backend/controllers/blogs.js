const Blog = require('../models/Blog');
const path = require("path");

 async function handleBlogData(req, res){
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
}
async function handleFetchBlogs(req, res) {
    let blogs = await Blog.find()
    if (blogs.length > 0) {
        res.send(blogs)
    }
    else {
        res.send("no result");
    }
}
module.exports = {
    handleBlogData,handleFetchBlogs
}