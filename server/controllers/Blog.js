import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    // res.send("blog app is working..");
    const { title, description, image } = req.body;
    if (!title || !description) {
      return res
        .status(422)
        .json({ message: "plz include all fields", status: "failed" });
    }
    const blog = new Blog({
      title,
      description,
      image,
      author: req.user._id,
    });
    await blog.save();
    res.status(201).json({
      blog: blog,
      success: true,
      message: "Blog created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      message: "something went wrong",
      status: "failed",
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email").sort({ createdAt: -1 }); ;
    if (blogs.length == 0) {
      return res
        .status(400)
        .json({ message: "No blog found", status: "failed" });
    }
    res
      .status(200)
      .json({
        blogs: blogs,
        message: "Successfully get Alll Blogs",
        status: "success",
      });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      message: "something went wrong",
      status: "failed",
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id).populate("author", "name email");
    if (!blog) {
      return res
        .status(400)
        .json({ message: "No blog found", status: "failed" });
    }
    res
      .status(200)
      .json({
        blog: blog,
        message: "Successfully get particular Blog",
        status: "success",
      });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      message: "something went wrong",
      status: "failed",
    });
  }
};

export const getMyPost = async (req, res) => {
  try {
    const userId = req.user._id; // assuming req.user is set by verifyToken
    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    // console.log("hii",blogs);
    // console.log("Logged in userId:", userId);
    
    if(blogs.length == 0){
      return res.status(400).json({message:'unable to get a blog',status:'failed'})
    }
    //  console.log("Blogs found:", blogs); 

    res.status(200).json({ blogs:blogs,status:'success',message:'successfully fetched my post' });
  } catch (err) {
   return res.status(500).json({
      err: err.message,
      message: "something went wrong",
      status: "failed",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image,
      },
      { new: true }
    );

    res.status(200).json({
      blog: updatedBlog,
      message: "Blog updated successfully",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      err: err.message,
      message: "something went wrong",
      status: "failed",
    });
  }
};

export const removeBlog = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({
        message: "Blog not found",
        status: "failed",
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
      message: "something went wrong",
      status: "failed",
    });
  }
};
