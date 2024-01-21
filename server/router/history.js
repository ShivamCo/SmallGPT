import express from "express";
import { userModel } from "../model/userSchema.js";
import bodyParser from "body-parser";

const app = express()
const router = express.Router()

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



router.post("/send", async (req, res) => {
        const { user_ID, searchTerm } = req.body
        

        try {
            const user = await userModel.findById( user_ID );
        
            if (user) {
              let resultHistory;
        
              if (searchTerm) {
                // If searchTerm is provided, filter history based on searchTerm
                resultHistory = user.history.filter(i => (i.question).toUpperCase().includes(searchTerm.toUpperCase()));
                // history.filter(i => (i.question).toUpperCase().includes(searchTerm.toUpperCase()))
            } else {
                // If searchTerm is empty, return the whole history
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

// try {
          
//     const documents = await userModel.findById(user_ID);
   

    
//     res.send(documents.history);
//   } catch (error) {
    
//     console.error('Error during GET request:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }

router.post("/remove/", async (req,res) => {
    const { user_ID, question } = req.body.removeDetail

        console.log(req.body)
    
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





res.send("Removed")





})

export { router as History }

