import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const Authentication = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "token is required" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res
      .status(500)
      .json({ message: "authentication secrete not available" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string") {
      return res.status(401).json({ message: "invalid token" });
    }

    req.user = decoded as JwtPayload & { role?: string };
    return next();
  } catch {
    return res
      .status(401)
      .json({ message: "Invalid or expired token" });
  }
};
