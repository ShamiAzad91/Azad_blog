import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({name,email,password});
      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }
    try {
    
      const res = await axios.post(
        `http://localhost:8000/auth/v1/register`,
        {
          name,
          email,
          password,
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(`my response is `, res);
      console.log(`my response is `, res.data);
      if (res.data?.user) {
        alert(`Hi ${res.data?.user?.name} ! You are  registerd successfully`|| 'user registerd successully');
        navigate("/login");
      } else {
        alert(`unable to registered`);
      }
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(
        "Failed to fetch users:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
          alt="Signup"
          className="signup-image"
        />
      </div>

      <div className="signup-right">
        <h2>Create an Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
        <p className="login-link">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
