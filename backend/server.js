const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const BlogModel = require('./models/blog');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Handle connection errors
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// Endpoint to get all blogs
app.get('/getBlogList', (req, res) => {
    BlogModel.find({})
        .then((blogList) => res.json(blogList))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Endpoint to add a new blog
app.post('/addBlog', (req, res) => {
    const { title, content, author, imageLink } = req.body;
    BlogModel.create({ title, content, author, imageLink })
        .then((blog) => res.json(blog))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Endpoint to update an existing blog by ID
app.post('/updateBlog/:id', (req, res) => {
    const id = req.params.id;
    const { title, content, author, imageLink } = req.body;
    BlogModel.findByIdAndUpdate(id, { title, content, author, imageLink }, { new: true })
        .then((blog) => {
            if (!blog) return res.status(404).json({ error: 'Blog not found' });
            res.json(blog);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Endpoint to delete a blog by ID
app.delete('/deleteBlog/:id', (req, res) => {
    const id = req.params.id;
    BlogModel.findByIdAndDelete(id)
        .then((blog) => {
            if (!blog) return res.status(404).json({ error: 'Blog not found' });
            res.json(blog);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Endpoint to search blogs by title
app.get('/searchBlogs', (req, res) => {
    const searchQuery = req.query.q;
    const searchRegex = new RegExp(searchQuery, 'i');
    BlogModel.find({ title: searchRegex })
        .then((blogList) => res.json(blogList))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Endpoint to get a single blog by ID
app.get('/getBlog/:id', (req, res) => {
    const id = req.params.id;
    BlogModel.findById(id)
        .then((blog) => {
            if (!blog) return res.status(404).json({ error: 'Blog not found' });
            res.json(blog);
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Start the server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
