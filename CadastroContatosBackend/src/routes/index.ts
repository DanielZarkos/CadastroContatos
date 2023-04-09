import { Router } from "express";
import userRoutes from "./user.routes";
import contactsRoutes from "./contacts.routes";
import loginRoutes from "./login.routes";

export const globalRoutes = Router();

globalRoutes.use("/api/users", userRoutes);
globalRoutes.use("/api/login", loginRoutes);
globalRoutes.use("/api/users/contact", contactsRoutes);
