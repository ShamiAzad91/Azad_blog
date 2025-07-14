import React, { useState } from "react";
import "./AddBlog.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const author_id = JSON.parse(localStorage.getItem("user"))._id;
  const token = localStorage.getItem("token");
//   console.log("hiii", author_id);
//   console.log("by", token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log({title,description,image})
    if (!title || !description) {
      return alert("Please add all fields.");
    }
    try {
      let res = await axios.post(
        `http://localhost:8000/blog/v1/create`,
        {
          title,
          description,
          image,
          author: author_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

    //   console.log("add_blog response:", res);
    //   console.log("add_blog:", res.data);
 
      if(res.data){
        alert(`${res.data.message}`);
        setTitle('');
        setDescription('');
        setImage(null);
        navigate("/")
 
      }


    } catch (error) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
