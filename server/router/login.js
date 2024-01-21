import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";


import { userModel } from "../model/userSchema.js";

const app = express()
const router = express.Router()
const JWT_SECRET = process.env.SECRET_KEY;
app.use(cors());
app.use(cookieParser())



router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ user:{userId: user._id} }, JWT_SECRET, { expiresIn: '1h' });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 10),
      httpOnly: true,
      sameSite: 'None', 
    };

    res.status(200).cookie('token', token, options).json({
      success: true,
      token,
      user,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});





export { router as Login }