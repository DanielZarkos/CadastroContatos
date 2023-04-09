import { Router } from "express";
import { loginMiddleware } from "../middlewares/validateLogin.middleware";
import { loginController } from "../controller/login.controller";

const loginRoutes = Router();

loginRoutes.post("", loginMiddleware, loginController);

export default loginRoutes;
