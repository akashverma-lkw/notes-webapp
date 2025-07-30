import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../models/User";

export interface AuthRequest extends Request {
  user?: UserDocument;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ error: "Invalid token" });

    (req as AuthRequest).user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized" });
  }
};
