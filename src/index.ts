import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config";

const app = express();
app.use(express.json());

app.use();
app.use();

mongoose
  .connect(config.mongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });
