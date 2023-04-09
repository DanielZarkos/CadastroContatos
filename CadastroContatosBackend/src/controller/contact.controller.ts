import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  updateContactService,
} from "../services/contact.service";

export const createContactController = async (req: Request, res: Response) => {
  const payload = req.body;
  const userId = req.user.id;
  const data = await createContactService(payload, userId);
  return res.status(201).json(data);
};

export const deleteContactController = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  await deleteContactService(contactId);
  return res.status(204).json();
};

export const updateContactController = async (req: Request, res: Response) => {
  const contact = req.body;
  const id = req.params.id;
  const data = await updateContactService(contact, id);
  return res.status(200).json(data);
};
