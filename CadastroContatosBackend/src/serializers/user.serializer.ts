import * as yup from "yup";
import { responseContactSerializer } from "./contact.serializer";

export const createUserSerializer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
});

export const responseUserSerializer = yup.object({
  id: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  created_at: yup.date(),
  phone: yup.string(),
  contacts: yup.array(responseContactSerializer),
});

export const responseListUsersSerializer = yup.array(responseUserSerializer);

export const updateUserSerializer = yup.object({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
  phone: yup.string(),
});
