// middleware/blogOwnership.js
import Blog from "../models/Blog.js";

const blogOwnership = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found", status: "failed" });
    }

    // Compare the blog's author with the logged-in user
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized", status: "failed" });
    }

    next(); // Authorized ✅
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
      status: "failed"
    });
  }
};

export default blogOwnership;
