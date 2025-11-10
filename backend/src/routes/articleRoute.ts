import express from "express";
import { extract } from "@extractus/article-extractor";
import OpenAI from "openai";
import {Article} from "../models/articleModel.js"

const router = express.Router();

// Health check endpoint
router.get("/", async (req, res) => {
  res.status(200).send("API is running :)");
});

// Extract article text from URL
router.post("/extract-article", async (req, res) => {
  const { url } = req.body;
  let articleText = "";
  try {
    const article = await extract(url);
    if (!article || !article.content) {
      return res.status(400).send("Could not extract article from URL");
    }
    const content = article.content
      .replace(/<[^>]*>/g, "")
      .trim(); /*remove all html elements from article.content */
    articleText = content.slice(0, 6000); /*limit to first 6000 characters*/
    res.status(200).send({
      title: article.title,
      text: articleText,
    });
  } catch (error) {
    console.error("Error extracting article:", error);
    if (error.message.includes("ENOTFOUND")) {
      return res.status(400).send("Invalid URL or unable to reach the website");
    }
    res.status(500).send("Internal Server Error");
  }
});

// Generate quiz based on article text
router.post("/generate-quiz", async (req, res) => {
  try {
    /*Open connection to OpenAI*/
    const openai = new OpenAI({
      baseURL: process.env.VITE_API_URL,
      apiKey: process.env.VITE_API_KEY,
    });
    const { text } = req.body;
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates quizzes based on the provided text.",
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

    if (rawJSON) {
      res.status(200).json(JSON.parse(rawJSON));
    }
  } catch (error) {
    res.status(500).send("Error getting AI response");
    console.error("Error parsing AI response:", error);
  }
});

// Save inputted article with generated quiz to database
router.post("/save-article", async (req, res) => {
    try{
        const {title, content, quiz} = req.body;
        if (!title || !content || !quiz) {
            return res.status(400).send("Missing required fields");
        }
        const newArticle = {
            title,
            content,
            quiz
        };
        const savedArticle = await Article.create(newArticle);
        return res.status(201).send(savedArticle);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({error: error.message});
    }
})

// Get all saved articles
router.get("/all-articles", async (req, res) => {
    try {
        const articles = await Article.find({});

        return res.status(200).send({
            count: articles.length,
            articles: articles
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({error: error.message});
    }
});

// Get a single artice
router.get("/article/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const article = await Article.findById(id);
        if (!article){
            return res.status(404).send("Article not found");
        }
        return res.status(200).send(article);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({error: error.message});
    }
})

// Delete an article
router.delete("/delete-article/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Article.findByIdAndDelete(id);
        if (!result){
            return res.status(404).send("Article not found");
        }
        return res.status(200).send("Article deleted successfully");
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({error: error.message});
    }
})

export default router;
