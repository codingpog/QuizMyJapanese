import express, { raw } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { extract } from '@extractus/article-extractor';
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(cors());
app.use(express.json());

app.post('/get-article', async (req, res) => {
    const {url} = req.body;
    let articleText = "";
    try {
        const article = await extract(url)
        if (!article || !article.content) {
            return res.status(400).send('Could not extract article from URL')
        }
        const content = article.content.replace(/<[^>]*>/g, "").trim()  /*remove all html elements from article.content */
        articleText = content.slice(0, 6000);  /*limit to first 6000 characters*/
        res.status(200).send({text: articleText});
    } catch (error) {
        console.error('Error extracting article:', error);
        if (error.message.includes('ENOTFOUND')) {
            return res.status(400).send('Invalid URL or unable to reach the website')
        }
        res.status(500).send('Internal Server Error');
    }
})

app.post('/generate-quiz', async (req, res) => { 
    /*Open connection to OpenAI*/
    const openai= new OpenAI({
    baseURL: process.env.VITE_API_URL,
    apiKey: process.env.VITE_API_KEY, 
    dangerouslyAllowBrowser: true,
    });
    const {text} = req.body;
  const completion = await openai.chat.completions.create({
    messages: [
        {
            role: "system",
            content: "You are a helpful assistant that generates quizzes based on the provided text.",
        },
        {
            role: "user",
            content: `
    Here is a passage of text:
    
    ${text}
    
    Please generate 5 multiple-choice reading comprehension questions in English based on the passage above. Each question should have:
    - One correct answer
    - Three distractor answers
    - Format: return ONLY a JSON array of 5 objects with "id", "question", "options", and "answer" fields. Do not wrap it in an object. Only return valid JSON.
            `.trim(),
          },
        ],
    response_format: { type: "json_object" },
    model: "deepseek-chat",
  });

  const rawJSON = completion.choices[0].message.content;

  try {
    if (rawJSON) {
        res.status(200).json(JSON.parse(rawJSON));      
    }
  } catch (error) {
    res.status(500).send('Error getting AI response');
    console.error('Error parsing AI response:', error);
  }
})

app.get('/', async (req, res) => {
    res.status(200).send('API is running');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})