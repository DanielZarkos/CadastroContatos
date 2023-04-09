import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";

const userRepository = AppDataSource.getRepository(User);

export const loginService = async (email: string) => {
  const user = await userRepository.findOneBy({ email });

  const token = jwt.sign({}, process.env.SECRET_KEY!, {
    expiresIn: "24h",
    subject: String(user?.id),
  });

  return { token: token };
};
