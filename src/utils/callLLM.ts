import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(
  process.env.LLM_API_KEY as string
);

export async function getEmojiSuggestions(text: string): Promise<string[]> {
  return [];
}
