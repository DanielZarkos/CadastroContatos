import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  readUserController,
} from "../controller/user.controller";
import { validateAuthTokenMiddleware } from "../middlewares/validadeAuthToken.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.delete("", validateAuthTokenMiddleware, deleteUserController);
userRoutes.get("", validateAuthTokenMiddleware, readUserController);

export default userRoutes;
