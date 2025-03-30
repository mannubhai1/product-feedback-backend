import { Router } from "express";
import { getAdminSummary } from "../controllers/adminController";
import { authenticateJWT } from "../middleware/auth";
import { authorizeRole } from "../middleware/roles";

const router = Router();

/**
 * @swagger
 * /api/admin/summary:
 *   get:
 *     summary: Get admin analytics summary
 *     description: Retrieves aggregated analytics data for all feedback entries.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved admin summary.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFeedback:
 *                   type: number
 *                 sentimentBreakdown:
 *                   type: object
 *                   properties:
 *                     positive:
 *                       type: number
 *                     neutral:
 *                       type: number
 *                     negative:
 *                       type: number
 *                 commonThemes:
 *                   type: array
 *                   items:
 *                     type: string
 *                 feedbackPerModule:
 *                   type: object
 *                   properties:
 *                     form_builder:
 *                       type: number
 *                     ai_scoring:
 *                       type: number
 *                     ui_ux:
 *                       type: number
 *                     dashboard:
 *                       type: number
 *                     other:
 *                       type: number
 *                 averageConfidence:
 *                   type: number
 *                 feedbackOverTime:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */
router.get(
  "/summary",
  authenticateJWT,
  authorizeRole("admin"),
  getAdminSummary
);

export default router;
