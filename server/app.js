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
const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.SECRET_KEY;



app.use(cookieParser())

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
})

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