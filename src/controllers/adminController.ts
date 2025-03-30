import { Request, Response } from "express";
import Feedback from "../models/Feedback";

export const getAdminSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalFeedback = await Feedback.countDocuments();

    const sentiments = await Feedback.aggregate([
      {
        $group: {
          _id: "$sentiment",
          count: { $sum: 1 },
        },
      },
    ]);

    const sentimentDistribution: Record<string, number> = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    sentiments.forEach((sentiment) => {
      sentimentDistribution[sentiment._id] = sentiment.count;
    });

    const themes = await Feedback.aggregate([
      { $unwind: "$themes" },
      {
        $group: {
          _id: "$themes",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    const commonThemes = themes.map((theme) => theme._id);

    const modules = [
      "form_builder",
      "ai_scoring",
      "ui_ux",
      "dashboard",
      "other",
    ];

    const feedbackByModule: Record<string, number> = {};

    for (const mod of modules) {
      feedbackByModule[mod] = await Feedback.countDocuments({
        moduleTags: mod,
      });
    }

    const confidenceLevels = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgConfidence: { $avg: "$confidence" },
        },
      },
    ]);

    const avgConfidence = confidenceLevels[0]?.avgConfidence || 0;

    const feedbackByTime = await Feedback.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $limit: 7,
      },
    ]);

    res.json({
      totalFeedback,
      sentimentDistribution,
      commonThemes,
      feedbackByModule,
      avgConfidence,
      feedbackByTime,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error getting admin summary: ", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
