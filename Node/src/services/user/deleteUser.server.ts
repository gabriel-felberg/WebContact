import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/app.error";
import { IUserId } from "../../interfaces/user";

export const deleteUserServer = async ({id}:IUserId) => {
    const userRepository = AppDataSource.getRepository(User);
    const ExistUser = await userRepository.findOneBy({id});
    if (!ExistUser) {
        throw new AppError("id not found",404);
    }
    await userRepository.delete(id)

    return;
  };
