import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IUserId } from "../../interfaces/user";

export const retriveUserServer = async ({id}:IUserId) => {
    const userRepository = AppDataSource.getRepository(User);
    const ExistUser = await userRepository.findOne({where:{id}});
    if (!ExistUser) {
      throw new AppError("user not found", 404);
    }
    return ExistUser;
  };
