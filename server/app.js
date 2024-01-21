import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import 'dotenv/config'


import { Login } from "./router/login.js";
import { Register } from "./router/register.js";
import { OpenAiRoute } from "./router/openAI.js";
import { History } from "./router/history.js";

const app = express()
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.SECRET_KEY;

app.use(cookieParser())

app.use(cors({
    origin: 'https://minichatgpt.netlify.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://shivamsinghcoo:NuzV0YOSyBaPCE5s@cluster0.k2nqksf.mongodb.net/');

app.use("/login", Login)
app.use("/register", Register )
app.use("/openai", OpenAiRoute)
app.use("/history", History)


app.listen( PORT, ()=>{
    console.log(`Server Live on ${PORT}`)
} )