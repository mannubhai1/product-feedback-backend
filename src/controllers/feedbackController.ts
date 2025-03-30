import { Response } from "express";
import Feedback from "../models/Feedback";
import { analyzeFeedback } from "../services/ai/analyzeFeedback";
import { AuthRequest } from "../middleware/auth";

export const submitFeedback = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    // console.log("Request body:", req.body); // Debug log
    const { feedbackText } = req.body;
    if (!feedbackText) {
      res.status(400).json({ message: "Feedback text is required" });
      return;
    }

    const analysis = await analyzeFeedback(feedbackText);
    // console.log("Analysis of the feedback:", analysis);

    const newFeedback = new Feedback({
      userId: req.user?.id,
      feedbackText,
      sentiment: analysis.sentiment,
      themes: analysis.themes,
      moduleTags: analysis.moduleTags,
      confidence: analysis.confidence,
    });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // console.error("Error submitting feedback:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const getFeedback = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { sentiment, theme, moduleTag, startDate, endDate } = req.query;
    const query: Record<string, unknown> = { userId: req.user?.id };

    if (sentiment) query.sentiment = sentiment;
    if (theme) query.themes = { $in: [theme] };
    if (moduleTag) query.moduleTags = { $in: [moduleTag] };
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate)
        (query.createdAt as Record<string, Date>)["$gte"] = new Date(
          startDate as string
        );
      if (endDate)
        (query.createdAt as Record<string, Date>)["$lte"] = new Date(
          endDate as string
        );
    }

    const feedbackList = await Feedback.find(query);
    res.json(feedbackList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
