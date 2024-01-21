import express from "express";
import { userModel } from "../model/userSchema.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express()
const router = express.Router()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


router.post("/remove", async (req,res) => {
    res.send("done")
    const { user_ID, question } = req.body.removeDetail

        console.log(req.body.removeDetail)
    
    userModel.updateOne(
        { _id: user_ID },
        { $pull: { 'history': {
            "question": question
        } } }
    )
    .then(result => {
        console.log('User history updated:', result);
    })
    .catch(error => {
        console.error('Error updating user history:', error);
    });




})

export { router as HistoryRemove }

