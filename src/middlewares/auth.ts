import { NextFunction, Request, Response } from "express";
import admin from "../config/firebase";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.send({ message: "No token provided" }).status(401);
  }
  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    res.status(401).json({ message: "Invalid token" });
  }

  const token = headerToken.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((data) => {
      (req as any).user = (data as any).uid;
      next();
    })
    .catch(() => res.status(403).json({ message: "Could not authorize" }));
};

export default auth;
