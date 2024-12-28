import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generate.token.js";

export const register = async (req, res) => {
  const { names, email, whatsappNumber, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(user){
      return res.status(403).json({ message : "user already exists" })
    };
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ names, email, whatsappNumber, password : hashedPassword });
    await newUser.save();
    return res.status(200).json({ message : "user created successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
     const user = await User.findOne({ email });
     if(!user){
      return res.status(404).json({ message : "user not found " });
     };
     const isPasswordValid = await bcrypt.compare(password, user.password);
     if(!isPasswordValid){
      return res.status(403).json({ message : "incorrect password" });
     };
     await generateTokenAndSetCookie(user._id, res)
     return res.status(200).json({ message : "user logged in successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error logging out : ', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};