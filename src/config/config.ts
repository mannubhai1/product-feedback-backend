import * as dotenv from "dotenv";
if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else if (!process.env.OPENAI_API_KEY) {
  dotenv.config();
}

export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "defaultSecret",
  openAIKey: process.env.OPENAI_API_KEY, // Should have a value from your .env
};
