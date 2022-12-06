import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/app.error";
import { IUserId } from "../../interfaces/user";

export const retriveContactServer = async ({id}:IUserId) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const ExistUser = await contactRepository.findOneBy({id});
  if (!ExistUser) {
    throw new AppError("user not found", 404);
  }
  return ExistUser;
};
