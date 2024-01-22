import OpenAI from "openai";
import express from "express";
import cors from "cors";

const router = express.Router()
const app = express()


app.use(cors());

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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {

    const content = req.body.question

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": content
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      res.send(response)

})

export { router as OpenAiRoute }

