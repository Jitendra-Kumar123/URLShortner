import express from "express";
import User from "../models/user.model.js";
import { gravatar } from "../utils/gravatar.js";
import bcrypt from "bcrypt";
import { register_user } from "../controller/auth.controller.js";
import { login_user } from "../controller/auth.controller.js";

const router = express.Router();

// Register new user
// router.post("/register", async (req, res) => {
//   try {
//     const { fullName, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Get gravatar URL for avatar
//     const avatarUrl = gravatar(email);

//     // Create new user
//     const newUser = new User({
//       fullName,
//       email,
//       password: hashedPassword,
//       avatar: avatarUrl,
//     });

//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully", user: {
//       id: newUser._id,
//       fullName: newUser.fullName,
//       email: newUser.email,
//       avatar: newUser.avatar
//     }});
//   } catch (error) {
//     console.error("Error registering user:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post("/register", register_user)
router.post("/register", login_user)

export default router;