import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import PrivateComponent from "./components/private/PrivateComponent";
import AddBlog from "./components/add_blog/AddBlog";
import Home from "./components/home/Home";
import SingleBlog from "./components/single_blog/SingleBlog";
import MyPost from "./components/my_post/MyPost";
import UpdateBlog from "./components/update_blog/UpdateBlog";
import Profile from "./components/profile/Profile";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
        <Route element={<PrivateComponent/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/add-blog" element={<AddBlog/> }/>
          <Route path="/single/blog/:id" element={<SingleBlog/> }/>

          <Route path="/update-blog/:id" element={<UpdateBlog/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/my-post" element={<MyPost/>} />
          <Route path="/logout" element={<h1>Logout</h1>} />
        </Route>

          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />

          <Route path="/*" element={<h1>Page Not found</h1>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
