import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import cors from "cors";


import authRoutes from "./routes/Auth.js";
import blogRoutes from "./routes/Blog.js";

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// ✅ Enable CORS
app.use(cors());
// Middleware for JSON parsing (important for APIs)
app.use(express.json());


//middleware
app.use("/auth/v1/",authRoutes);
app.use("/blog/v1/",blogRoutes);



app.get("/",(req,res)=>{
    res.send('App is working')
});


// My port
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is up and running at ${port}`);
});