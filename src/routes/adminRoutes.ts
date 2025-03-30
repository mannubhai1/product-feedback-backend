import { Router } from "express";
import { getAdminSummary } from "../controllers/adminController";
import { authenticateJWT } from "../middleware/auth";
import { authorizeRole } from "../middleware/roles";

const router = Router();

// Admin analytics endpoint
router.get(
  "/summary",
  authenticateJWT,
  authorizeRole("admin"),
  getAdminSummary
);

export default router;
