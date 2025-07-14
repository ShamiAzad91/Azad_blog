import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../signup/Signup.css"; // Using same styling as Signup
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    console.log({email,password});
    

    try {
      const res = await axios.post(
        `http://localhost:8000/auth/v1/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // console.log("Login response:", res);
      // console.log("Login  gherervs:", res.data.user);


      if (res.data?.token) {
        alert(`Welcome ${res.data?.user?.name || ""}`);
        localStorage.setItem("token", res.data.token); // Save JWT token
        localStorage.setItem("user",JSON.stringify(res.data?.user))
        navigate("/"); // Redirect to home or dashboard
      } else {
        alert("Invalid credentials");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym9va3N8ZW58MHx8MHx8fDA%3D"
          alt="Login"
          className="signup-image"
        />
      </div>

      <div className="signup-right">
        <h2>Login to Your Account</h2>
        <form className="signup-form" onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p className="login-link">
          Don’t have an account? <Link to="/signup">Signup here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
