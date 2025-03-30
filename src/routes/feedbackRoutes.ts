import { Router } from "express";
import { submitFeedback, getFeedback } from "../controllers/feedbackController";
import { authenticateJWT } from "../middleware/auth";
import { validateFeedback } from "../middleware/validateFeedback";

const router = Router();

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit product feedback
 *     description: Investors submit qualitative feedback, which is analyzed by AI.
 *     tags:
 *       - Feedback
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedbackText:
 *                 type: string
 *                 example: "The form builder is super flexible, but the AI scoring didn’t really match my thesis priorities."
 *     responses:
 *       201:
 *         description: Feedback submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Feedback text is required.
 *       401:
 *         description: Unauthorized.
 */
router.post("/", authenticateJWT, validateFeedback, submitFeedback);

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Get investor feedback
 *     description: Retrieves all feedback submitted by the authenticated investor.
 *     tags:
 *       - Feedback
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of feedback entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 *       401:
 *         description: Unauthorized.
 */
router.get("/", authenticateJWT, getFeedback);

export default router;
