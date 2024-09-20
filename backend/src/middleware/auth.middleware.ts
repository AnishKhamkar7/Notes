import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorFactory from "../errors";
import envConfig from "../config/env.config";

declare module "express" {
  interface Request {
    userId?: string;
  }
}

declare module "jsonwebtoken" {
  interface JwtPayload {
    id?: string;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("authorization")?.split(" ")[1];

  if (!token) {
    throw ErrorFactory.unauthorizedError("Authorization token not found");
  }

  jwt.verify(token, envConfig.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw ErrorFactory.unauthorizedError("Token is Unauthorized");
    }
    const { id } = user as jwt.JwtPayload;

    req.userId = id;
    next();
  });
};
