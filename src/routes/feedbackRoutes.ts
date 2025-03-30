import { Router } from "express";
import { submitFeedback, getFeedback } from "../controllers/feedbackController";
import { authenticateJWT } from "../middleware/auth";
import { validateFeedback } from "../middleware/validateFeedback";

const router = Router();

router.post("/", authenticateJWT, validateFeedback, submitFeedback);
router.get("/", authenticateJWT, getFeedback);

export default router;
