import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleBlog.css";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/blog/v1/single/${id}`);
        console.log("hii",res.data);
        
        setBlog(res.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
  useEffect(() => {   
    fetchBlog();
  },[]);
  


  if (!blog) return <div>Loading...</div>;

  return (
    <div className="single-blog-container">
      <div className="single-blog-card">
        <img
          src={
            blog.image ||
            `https://picsum.photos/seed/${blog._id}/600/300`
          }
          alt={blog.title}
          className="single-blog-image"
        />
        <div className="single-blog-content">
          <h2 className="single-blog-title">{blog.title}</h2>
          <p className="single-blog-meta">
            By <strong>{blog.author?.name || "Unknown"}</strong> |{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p className="single-blog-description">{blog.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
