import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const feedbackSchema = z.object({
  feedback: z.string().min(1, "Feedback text is required"),
});

export const validateFeedback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = feedbackSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }
  next();
};
