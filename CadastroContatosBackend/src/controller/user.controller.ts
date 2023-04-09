import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  readUserService,
} from "../services/user.service";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  try {
    const user = await createUserService(name, email, password, phone);
    user.password = "You shall never know.";
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  //futuramente usar o read aqui.
  const userId: string = req.user.id;

  await deleteUserService(userId);

  return res.status(202).send("User " + userId + " deleted");
};

export const readUserController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;

  try {
    const returnedUser = await readUserService(userId);
    return res.status(200).send(returnedUser);
  } catch (error) {
    return res.status(404).send("Not found!");
  }
};
