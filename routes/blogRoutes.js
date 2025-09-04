import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// Create a new blog with user
router.post("/", async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const blog = new Blog({ title, description, user: userId });
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all blogs with user info
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "name email"); // show user name & email
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single blog by ID with user info
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a blog by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a blog by ID
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;