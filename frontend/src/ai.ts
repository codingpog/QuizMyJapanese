// Please install OpenAI SDK first: `npm install openai`
import type { QuizQuestion } from "./types";
import OpenAI from "openai";

const openai: OpenAI = new OpenAI({
  baseURL: import.meta.env.VITE_API_URL,
  apiKey: import.meta.env.VITE_API_KEY, 
  dangerouslyAllowBrowser: true,
});

export async function generateQuiz(text: string): Promise<QuizQuestion[] | undefined> {
  const completion = await openai.chat.completions.create({
    messages: [
        {
            role: "system",
            content: "You are a helpful assistant that generates quizzes based on the provided text.",
        },
        {
            role: "user",
            content: `
    Here is a passage in Japanese:
    
    ${text}
    
    Please generate 3 multiple-choice reading comprehension questions in English based on the passage above. Each question should have:
    - One correct answer
    - Three distractor answers
    - Format: return ONLY a JSON array of 3 objects with "id", "question", "options", and "answer" fields. Do not wrap it in an object. Only return valid JSON.
            `.trim(),
          },
        ],
    response_format: { type: "json_object" },
    model: "deepseek-chat",
  });

  const rawJSON: string | null =  completion.choices[0].message.content;

  try {
    if (rawJSON) {
        console.log("Raw JSON response:", rawJSON);
        const quiz = JSON.parse(rawJSON);
        return quiz;        
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.error("Raw JSON response:", rawJSON);
    throw new Error("Failed to parse quiz data");
  }
}
