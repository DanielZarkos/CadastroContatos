import * as yup from "yup";

export const responseContactSerializer = yup.object().shape({
  id: yup.string().uuid(),
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string(),
  created_at: yup.date(),
  owner: yup.string(),
});

export const contactSerializerRequest = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  ownerId: yup.string().required(),
});
