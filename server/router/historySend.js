import express from "express";
import { userModel } from "../model/userSchema.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express()
const router = express.Router()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router.post("/send", async (req, res) => {
        const { user_ID, searchTerm } = req.body
        

        try {
            const user = await userModel.findById( user_ID );
        
            if (user) {
              let resultHistory;
        
              if (searchTerm) {
                
                resultHistory = user.history.filter(i => (i.question).toUpperCase().includes(searchTerm.toUpperCase()));
            } else {
                resultHistory = user.history;
              }
        
              res.status(200).json(resultHistory);
            } else {
              res.status(404).json({ message: 'User not found' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }

})


router.post("/awake", async (req, res) => {

  try {

    const response = await userModel.findOne({email: "sdasdfasdfasdfsa"})
    
    res.json(response)
    console.log(response)

  } catch (error) {

    console.log(error.message)

  }

})

export { router as HistorySend }