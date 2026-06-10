import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthUserPayload } from "../types/express.js";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET belum diatur");
  }

  return secret;
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token tidak ditemukan" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token tidak ditemukan" });
    return;
  }

  try {
    req.user = jwt.verify(token, getJwtSecret()) as unknown as AuthUserPayload;
    next();
  } catch {
    res.status(401).json({ message: "Token tidak valid" });
  }
};
