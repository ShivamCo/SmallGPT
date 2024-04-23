import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import axios from "axios";


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

mongoose.connect('mongodb+srv://shivamsinghcoo:NuzV0YOSyBaPCE5s@cluster0.k2nqksf.mongodb.net/');

// const Awake = async () => {

//     try {
//         const response = await axios.post("http://localhost:4000/history/awake")
//         console.log(response.data)
//     } catch (error) {
//         console.log(error.message)
//     }

// }




// setInterval(Awake, 14*60*1000);

app.use("/login", Login)
app.use("/register", Register )
app.use("/openai", OpenAiRoute)
app.use("/history", HistoryRemove)
app.use("/history", HistoryAdd)
app.use("/history", HistorySend)


app.listen( PORT, ()=>{
    console.log(`Server Live on ${PORT}`)
} )