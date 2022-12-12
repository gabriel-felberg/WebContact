import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

export const getUserServer = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const ExistUser = await userRepository.find();
  return ExistUser;
};
