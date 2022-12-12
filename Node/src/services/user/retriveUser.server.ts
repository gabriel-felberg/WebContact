import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserId } from "../../interfaces/user";

export const retriveUserServer = async ({id}:IUserId) => {
    const userRepository = AppDataSource.getRepository(User);
    const ExistUser = await userRepository.findOneBy({id});
    return ExistUser;
  };
