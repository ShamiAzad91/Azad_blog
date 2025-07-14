import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/blog/v1/all");
      console.log("hii", res.data);
      console.log("hii", res);

    setBlogs(res.data.blogs);
    setFilteredBlogs(res.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, blogs]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
const getRandomImage = (id) => {
  const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${hash}/400/200`;
};
  return (
    <div className="blog-container">
      <h2 className="title">📝 Blog List</h2>

      <div className="search-sort">
        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

     <div className="card-grid">
  {currentBlogs.map((blog) => (
    <Link
      to={`/single/blog/${blog._id}`}
      key={blog._id}
      className="blog-link"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="blog-card">
        <img
          src={getRandomImage(blog._id)}
          alt={blog.title}
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">{blog.title}</h3>
          <p className="card-description">{blog.description}</p>
    <p className="card-meta">
  By <strong>{blog.author?.name || "Unknown"}</strong> |{" "}
  {new Date(blog.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // ✅ AM/PM format
  })}
</p>

        </div>
      </div>
    </Link>
  ))}
</div>


      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          ⬅ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Home;
