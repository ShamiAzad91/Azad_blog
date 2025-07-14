import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken"


export const registerUser = async(req,res)=>{
   try {
     
      const { name, email, password } = req.body;

        // Validation
   if (!name || !email || !password) {
      return res.status(422).json({ err: "All fields are required" });
    }

  if(password.length < 5){
       return res.status(400).json({ message: "Password must be at least 5 characters",status:'failed' });
  }
     // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists",status:'failed' });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to DB
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    user.password = undefined;
    res.status(201).json({user:user, message: "User registered successfully",status:'success' });

   } catch (err) {
    return res.status(500).json({err:err.message,message:'something went wrong',status:'failed'})
    
   }
}


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
          // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" ,status:'failed'});
    }
        // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials",status:'failed' });
    }

    //compare password
    const passwordMatched = await bcrypt.compare(password,user.password);

    if(!passwordMatched){
        return res.status(401).json({ message: "Invalid credentials",status:'failed' });

    }
      const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

    res.status(200).json({
    message: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    },
    status:'success'
  });

        
    } catch (err) {
    return res.status(500).json({err:err.message,message:'something went wrong',status:'failed'})
        
    }
}

export const getProfile = async(req,res)=>{
  try {
    // console.log("jjj",req.user._id);
    const user = await User.findById(req.user._id).select("-password"); // remove password
    if (!user) {
      return res.status(404).json({ message: "User not found", status: "failed" });
    }
    return res.status(200).json({
  user,
  message: "Profile fetched successfully",
  status: "success",
});
    
  } catch (err) {
    return res.status(500).json({err:err.message,message:'something went wrong',status:'failed'})
    
  }
}