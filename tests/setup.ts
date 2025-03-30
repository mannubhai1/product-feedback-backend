// tests/setup.ts
import mongoose from "mongoose";
import { config } from "../src/config/config";

beforeAll(async () => {
  await mongoose.connect(config.mongoURI);
});

afterAll(async () => {
  await mongoose.disconnect();
});
