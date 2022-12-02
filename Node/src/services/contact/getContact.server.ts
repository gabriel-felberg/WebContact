import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";

export const getContactServer = async () => {
  const userRepository = AppDataSource.getRepository(Contact);
  const ExistUser = await userRepository.find();
  return ExistUser;
};
