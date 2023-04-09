import { User } from "../entities/user";
import { AppDataSource } from "../data-source";
import { hash } from "bcrypt";
import { responseUserSerializer } from "../serializers/user.serializer";

const userRepository = AppDataSource.getRepository(User);

// createUserService

export const createUserService = async (
  name: string,
  email: string,
  password: string,
  phone: string
): Promise<User> => {
  const users = await userRepository.find();
  const existentUser = users.find((user) => user.email === email);
  const hashedPassword = await hash(password, 5);

  if (existentUser) {
    if (existentUser.isActive === true) {
      throw new Error("This email is already being used.");
    } else {
      existentUser.name = name;
      existentUser.password = hashedPassword;
      existentUser.email = email;
      existentUser.phone = phone;
      existentUser.isActive = true;
      existentUser.contacts = [];
      return userRepository.save(existentUser);
    }
  }

  if (!password) {
    throw new Error("Password is missing.");
  }

  const user = new User();
  user.name = name;
  user.password = hashedPassword;
  user.email = email;
  user.phone = phone;
  user.contacts = [];
  return userRepository.save(user);
};

// deleteUserService

export const deleteUserService = async (id: string) => {
  const user = await userRepository.findOneBy({
    id,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return await userRepository.update(id, {
    isActive: false,
  });
};

// updateUserService

export const updateUserService = async (
  id: string,
  name?: string,
  email?: string,
  password?: string,
  phone?: string
): Promise<User | undefined> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    return undefined;
  }
  if (email && email !== user.email) {
    const userExists = await userRepository.findOneBy({ email });
    if (userExists) {
      throw new Error("Email already used");
    }
    user.email = email;
  }
  if (name) {
    user.name = name;
  }
  if (password) {
    const hashedPassword = await hash(password, 5);
    user.password = hashedPassword;
  }
  if (phone) {
    user.phone = phone;
  }
  await userRepository.save(user);
  return user;
};

// readUserService

// export const readUserService = async (id: any) => {
//   const user = await userRepository.findOne({
//     where: { id: id },
//   });
//   if (!user) throw new Error("User not found");

//   return user;
// };

export const readUserService = async (id: string) => {
  const user = await userRepository.findOne({
    relations: { contacts: true },
    where: { id: id },
  });
  if (!user) throw new Error("User not found");

  user.password = "";

  return user;
};
