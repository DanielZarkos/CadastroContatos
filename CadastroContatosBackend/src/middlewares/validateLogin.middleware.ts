import { NextFunction, Request, Response } from "express";
import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";

const userRepository = AppDataSource.getRepository(User);

export const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await userRepository.findOneBy({ email: email });

  if (user?.isActive === false) {
    throw new Error("Sua conta foi deletada.");
  }

  if (!user) {
    return res.status(401).json({ message: "Wrong email or password" });
  }

  const passwordCompare = await compare(password, user.password);

  if (!passwordCompare)
    return res.status(401).json({ message: "Wrong email or password" });

  return next();
};
