import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../add_blog/AddBlog.css"
const UpdateBlog = () => {
  const  params  = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/blog/v1/single/${params.id}`);
      const blog = res.data.blog;
      setTitle(blog.title);
      setDescription(blog.description);
    } catch (err) {
      console.error("Error fetching blog:", err);
      alert("Failed to fetch blog data.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.put(
        `http://localhost:8000/blog/v1/update/${params.id}`,
          {
        title,
        description,
        image, // still sending directly (won’t work for files like this)
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        alert(res.data.message || "Blog updated successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Blog</h2>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Upload New Image (optional)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
