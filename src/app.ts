import express from "express";
import feedbackRoutes from "./routes/feedbackRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();

app.use(express.json());

app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

export default app;
