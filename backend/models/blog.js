const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String, // Add the image link field
    },
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
