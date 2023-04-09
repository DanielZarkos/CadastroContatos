import { Contact } from "../entities/contact";
import { User } from "../entities/user";
import { AppDataSource } from "../data-source";
import { responseContactSerializer } from "../serializers/contact.serializer";

const userRepository = AppDataSource.getRepository(User);
const contactRepository = AppDataSource.getRepository(Contact);

export const createContactService = async (payload: any, userId: any) => {
  //try {
  payload.owner = userId;
  const newContact = contactRepository.create({ ...payload });
  await contactRepository.save(newContact);

  return newContact;
};

export const updateContactService = async (payload: any, id: any) => {
  const contactFound = await contactRepository.findOneBy({ id });

  if (!contactFound) throw new Error("Contact not found");

  const updateContact = await contactRepository.save({
    ...contactFound,
    ...payload,
  });

  return await responseContactSerializer.validate(updateContact, {
    stripUnknown: true,
  });
};

export const deleteContactService = async (id: string) => {
  const contact = await contactRepository.findOneBy({ id });
  return contactRepository.remove(contact!);
};
