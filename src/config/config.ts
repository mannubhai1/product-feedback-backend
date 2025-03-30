import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "defaultSecret",
  openAIKey: process.env.OPENAI_API_KEY, // Should have a value from your .env
};
