import express from "express";
import {registerUser,login,getProfile} from "../controllers/Auth.js";
import verifyToken from "../middleware/token.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",login);
router.get("/profile",verifyToken,getProfile);




export default router;