import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/app.error";
import { IUserId } from "../../interfaces/user";

export const deleteContactServer = async ({id}:IUserId) => {
  const userRepository = AppDataSource.getRepository(Contact);
  const ExistUser = await userRepository.findOneBy({id});
  if (!ExistUser) {
      throw new AppError("id not found",404);
  }
  await userRepository.delete(id)

  return;
};
