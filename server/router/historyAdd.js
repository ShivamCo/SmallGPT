import express from "express";
import { userModel } from "../model/userSchema.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express()
const router = express.Router()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


router.post("/add", async (req, res) => {

    const {question, answer,  user_ID} = req.body;
    
        userModel.updateOne(
            { _id: user_ID },
            { $push: { history: {
                "question": question,
                "answer": answer
            } } }
        )
        .then(result => {
            console.log('User history updated:', result);
        })
        .catch(error => {
            console.error('Error updating user history:', error);
        });

    
    


    res.send("added")

})


export { router as HistoryAdd }

