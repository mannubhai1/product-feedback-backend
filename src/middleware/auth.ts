import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
  user?: { id: string; role: "investor" | "admin" };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: string;
      role: "investor" | "admin";
    };
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
};
