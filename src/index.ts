import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables as early as possible

import mongoose from "mongoose";
import app from "./app";
import { config } from "./config/config";

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("MongoDB connected");
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

startServer();
