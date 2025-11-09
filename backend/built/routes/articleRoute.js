var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { extract } from '@extractus/article-extractor';
import OpenAI from "openai";
const router = express.Router();
router.post('/extract-article', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    let articleText = "";
    try {
        const article = yield extract(url);
        if (!article || !article.content) {
            return res.status(400).send('Could not extract article from URL');
        }
        const content = article.content.replace(/<[^>]*>/g, "").trim(); /*remove all html elements from article.content */
        articleText = content.slice(0, 6000); /*limit to first 6000 characters*/
        res.status(200).send({
            title: article.title,
            text: articleText
        });
    }
    catch (error) {
        console.error('Error extracting article:', error);
        if (error.message.includes('ENOTFOUND')) {
            return res.status(400).send('Invalid URL or unable to reach the website');
        }
        res.status(500).send('Internal Server Error');
    }
}));
router.post('/generate-quiz', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*Open connection to OpenAI*/
        const openai = new OpenAI({
            baseURL: process.env.VITE_API_URL,
            apiKey: process.env.VITE_API_KEY,
        });
        const { text } = req.body;
        const completion = yield openai.chat.completions.create({
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
        if (rawJSON) {
            res.status(200).json(JSON.parse(rawJSON));
        }
    }
    catch (error) {
        res.status(500).send('Error getting AI response');
        console.error('Error parsing AI response:', error);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send('API is running');
}));
export default router;
//# sourceMappingURL=articleRoute.js.map