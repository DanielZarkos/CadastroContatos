import { Router } from "express";
import {
  updateContactController,
  createContactController,
  deleteContactController,
} from "../controller/contact.controller";
import { validateAuthTokenMiddleware } from "../middlewares/validadeAuthToken.middleware";

const contactsRoutes = Router();

contactsRoutes.post("", validateAuthTokenMiddleware, createContactController);
contactsRoutes.patch(
  "/:id",
  validateAuthTokenMiddleware,
  updateContactController
);
contactsRoutes.delete(
  "/:id",
  validateAuthTokenMiddleware,
  deleteContactController
);

export default contactsRoutes;
