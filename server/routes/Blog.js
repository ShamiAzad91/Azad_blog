import express from "express";
import { createBlog,getAllBlogs,getSingleBlog,getMyPost,updateBlog,removeBlog } from "../controllers/Blog.js";
import verifyToken from "../middleware/token.js";
import blogOwnership from "../middleware/blogOwner.js";

const router = express.Router();

router.post("/create",verifyToken,createBlog);

router.get("/all",getAllBlogs);

router.get("/single/:id",getSingleBlog);
router.get("/myPost",verifyToken,getMyPost)
router.put("/update/:id",verifyToken,blogOwnership,updateBlog);
router.delete("/remove/:id",verifyToken,blogOwnership,removeBlog);






export default router;