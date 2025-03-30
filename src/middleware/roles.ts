import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export const authorizeRole = (role: "admin" | "investor") => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  };
};
