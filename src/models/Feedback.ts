import { Schema, model, Document } from "mongoose";

interface IFeedback extends Document {
  userId: string;
  feedbackText: string;
  sentiment: "positive" | "negative" | "neutral";
  themes: string[];
  moduleTags: string[];
  confidence: number;
  createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
  userId: { type: String, required: true },
  feedbackText: { type: String, required: true },
  sentiment: {
    type: String,
    enum: ["positive", "negative", "neutral"],
    required: true,
  },
  themes: { type: [String], default: [] },
  moduleTags: { type: [String], default: [] },
  confidence: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default model<IFeedback>("Feedback", FeedbackSchema);
