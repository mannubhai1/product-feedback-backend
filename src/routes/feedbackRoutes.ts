import { Router } from "express";
import { submitFeedback, getFeedback } from "../controllers/feedbackController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.post("/", authenticateJWT, submitFeedback);
router.get("/", authenticateJWT, getFeedback);

export default router;
