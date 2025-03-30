import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const feedbackSchema = z.object({
  feedbackText: z.string().min(1, "Feedback text is required"),
});

export const validateFeedback = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = feedbackSchema.safeParse(req.body);
  if (!result.success) {
    // console.log("Validation error:", result.error.errors);
    res.status(400).json({ errors: result.error.errors });
    return;
  }
  next();
};
