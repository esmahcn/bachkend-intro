import Blog from "../models/Blog.js";

// Create a new blog (requires auth)
export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: "Title and description required" });

    const blog = new Blog({
      title,
      description,
      user: req.user._id, // set from auth middleware
    });

    await blog.save();
    // populate and return
    const populated = await Blog.findById(blog._id).populate("user", "name email");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all blogs (public)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "name email");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a blog (only owner)
export const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }

    blog.title = title ?? blog.title;
    blog.description = description ?? blog.description;

    await blog.save();
    const populated = await Blog.findById(blog._id).populate("user", "name email");
    res.json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog (only owner)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    await blog.remove();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};