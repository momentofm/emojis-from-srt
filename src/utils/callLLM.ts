import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(process.env.LLM_API_KEY as string);

export async function getEmojiSuggestions(text: string): Promise<string[]> {
  try {
    const model: GenerativeModel = genAI.getGenerativeModel({
      model: process.env.LLM_MODEL_NAME as string,
    });

    const prompt = `Given this text, suggest 3-5 relevant emojis that capture the mood and content. Only respond with emojis separated by spaces, no text:
    "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().split(/\s+/).filter(emoji => emoji.length > 0);
  } catch (error) {
    console.error("Error generating emoji suggestions:", error);
    throw error;
  }
}
