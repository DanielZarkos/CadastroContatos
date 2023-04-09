import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";

const userRepository = AppDataSource.getRepository(User);

export const validateAuthTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authToken = req.headers.authorization;

  if (!authToken)
    res.status(401).json({ message: "Missing authorization headers" });

  authToken = authToken?.split(" ")[1];

  return jwt.verify(
    authToken!,
    process.env.SECRET_KEY!,
    (error, decoded: any) => {
      if (error) {
        res.status(401).json({ message: "Missing authorization headers" });
      }

      req.user = {
        id: decoded.sub,
      };

      return next();
    }
  );
};
