import React, { useEffect, useState } from "react";
import "./MyPost.css";
import axios from "axios";

import { Link } from "react-router-dom";

const MyPost = () => {
  const [blogs, setBlogs] = useState([]);
  const token =localStorage.getItem("token");
  // console.log("hhhh",token);
  

  useEffect(() => {
    getAllMyPost();
  }, []);

  const getAllMyPost = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/blog/v1/myPost`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setBlogs(res.data.blogs);
      }
    } catch (err) {
      console.error(
        "Failed to fetch blogs:",
        err.response?.data || err.message
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;
    try {
      let res = await axios.delete(
        `http://localhost:8000/blog/v1/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        alert("🗑️ Product deleted successfully");
         setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      }
    } catch (err) {
      console.error(
        "Failed to fetch blogs:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="myblogs-container">
      <h2>My Blog Posts</h2>
      <div className="blogs-grid">
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <img
                src={
                  blog.image || `https://picsum.photos/seed/${blog._id}/600/300`
                }
                alt={blog.title}
                className="blog-image"
              />
              <div className="blog-info">
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <small>
                  Posted on: {new Date(blog.createdAt).toLocaleDateString()} |
                  By: Me
                </small>

                <div className="blog-actions">
                 <Link to={`/update-blog/${blog._id}`} className="update-btn">
  Update
</Link>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPost;
