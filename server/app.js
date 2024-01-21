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
import { HistoryRemove } from "./router/historyRemove.js";
import { HistoryAdd } from "./router/historyAdd.js";
import { HistorySend } from "./router/historySend.js";

const app = express()
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.SECRET_KEY;

app.use(cookieParser())

app.use(cors({
    origin: ['https://minichatgpt.netlify.app/','http://localhost:5173/', 'https://65ad4cb7f147bb7d375d17f2--minichatgpt.netlify.app/'], 
    optionsSuccessStatus: 200,
  }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://shivamsinghcoo:NuzV0YOSyBaPCE5s@cluster0.k2nqksf.mongodb.net/');

app.use("/login", Login)
app.use("/register", Register )
app.use("/openai", OpenAiRoute)
app.use("/history", HistoryRemove)
app.use("/history", HistoryAdd)
app.use("/history", HistorySend)


app.listen( PORT, ()=>{
    console.log(`Server Live on ${PORT}`)
} )