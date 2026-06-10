import type { JwtPayload } from "jsonwebtoken";

export type AuthUserPayload = JwtPayload & {
  userId: number;
  email: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export {};
