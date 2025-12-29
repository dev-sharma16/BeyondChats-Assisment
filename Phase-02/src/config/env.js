import dotenv from 'dotenv';
dotenv.config();

export const config = {
  phase1Api: process.env.PHASE1_API_BASE_URL,
  serpApiKey: process.env.SERP_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
};
